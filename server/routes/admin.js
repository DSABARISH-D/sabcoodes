const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { getDb, query, run, get } = require('../db');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

// Admin-only middleware
function adminOnly(req, res, next) {
    if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    next();
}

// ── USERS ──────────────────────────────────────────────────────────────────

// GET /api/admin/users – list all users
router.get('/users', adminOnly, async (req, res) => {
    try {
        const db = await getDb();
        const users = query(db, `SELECT id, username, role, allowed_languages, seen_questions, created_at FROM users ORDER BY created_at DESC`);
        res.json(users.map(u => ({
            ...u,
            allowed_languages: JSON.parse(u.allowed_languages || '[]'),
            seen_questions: JSON.parse(u.seen_questions || '[]')
        })));
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/admin/users – create a user
router.post('/users', adminOnly, async (req, res) => {
    const { username, password, allowed_languages } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    try {
        const db = await getDb();
        const existing = get(db, 'SELECT id FROM users WHERE username = ?', [username]);
        if (existing) return res.status(409).json({ error: 'Username already taken' });
        const hash = bcrypt.hashSync(password, 10);
        const langs = JSON.stringify(allowed_languages || ['java', 'python', 'javascript', 'cpp', 'c']);
        const result = run(db, `INSERT INTO users (username, password, role, allowed_languages) VALUES (?,?,?,?)`,
            [username, hash, 'user', langs]);
        res.json({ id: result.lastInsertRowid, username, allowed_languages: JSON.parse(langs) });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT /api/admin/users/:id – update user (password, languages)
router.put('/users/:id', adminOnly, async (req, res) => {
    const { password, allowed_languages } = req.body;
    try {
        const db = await getDb();
        if (password) {
            const hash = bcrypt.hashSync(password, 10);
            run(db, 'UPDATE users SET password = ? WHERE id = ?', [hash, req.params.id]);
        }
        if (allowed_languages) {
            run(db, 'UPDATE users SET allowed_languages = ? WHERE id = ?',
                [JSON.stringify(allowed_languages), req.params.id]);
        }
        // Reset seen questions if requested
        if (req.body.reset_questions) {
            run(db, 'UPDATE users SET seen_questions = ? WHERE id = ?', ['[]', req.params.id]);
        }
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', adminOnly, async (req, res) => {
    try {
        const db = await getDb();
        run(db, 'DELETE FROM users WHERE id = ? AND role != ?', [req.params.id, 'admin']);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── QUESTIONS ──────────────────────────────────────────────────────────────

// GET /api/admin/questions
router.get('/questions', adminOnly, async (req, res) => {
    try {
        const db = await getDb();
        const qs = query(db, 'SELECT * FROM questions ORDER BY created_at DESC');
        res.json(qs.map(q => ({ ...q, test_cases: JSON.parse(q.test_cases), starter_code: q.starter_code ? JSON.parse(q.starter_code) : {} })));
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/admin/questions – add question
router.post('/questions', adminOnly, async (req, res) => {
    const { title, description, difficulty, starter_code, test_cases } = req.body;
    if (!title || !description || !test_cases) return res.status(400).json({ error: 'title, description, test_cases required' });
    try {
        const db = await getDb();
        const result = run(db, `INSERT INTO questions (title, description, difficulty, starter_code, test_cases) VALUES (?,?,?,?,?)`,
            [title, description, difficulty || 'Easy',
                JSON.stringify(starter_code || {}),
                JSON.stringify(test_cases)]);
        res.json({ id: result.lastInsertRowid, title });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT /api/admin/questions/:id – update question
router.put('/questions/:id', adminOnly, async (req, res) => {
    const { title, description, difficulty, starter_code, test_cases } = req.body;
    try {
        const db = await getDb();
        run(db, `UPDATE questions SET title=?, description=?, difficulty=?, starter_code=?, test_cases=? WHERE id=?`,
            [title, description, difficulty,
                JSON.stringify(starter_code || {}),
                JSON.stringify(test_cases),
                req.params.id]);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE /api/admin/questions/:id
router.delete('/questions/:id', adminOnly, async (req, res) => {
    try {
        const db = await getDb();
        run(db, 'DELETE FROM questions WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── STATS ──────────────────────────────────────────────────────────────────

// GET /api/admin/stats – all submissions with user info
// GET /api/admin/stats – all submissions with user info
router.get('/stats', adminOnly, async (req, res) => {
    try {
        const db = await getDb();
        const sessions = query(db, `
      SELECT s.id, s.user_id, u.username, s.score, s.total, s.status, s.started_at, s.submitted_at
      FROM sessions s JOIN users u ON s.user_id = u.id
      ORDER BY s.started_at DESC
    `);

        // Enhance with detailed submissions
        for (const session of sessions) {
            const subs = query(db, `
                SELECT sub.question_id, q.title, sub.passed, sub.total, sub.status, sub.language
                FROM submissions sub
                JOIN questions q ON sub.question_id = q.id
                WHERE sub.session_id = ?
            `, [session.id]);
            session.details = subs;
        }

        res.json(sessions);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── PDF UPLOAD ─────────────────────────────────────────────────────────────
const multer = require('multer');
const { PDFParse } = require('pdf-parse');

const upload = multer({ storage: multer.memoryStorage() });

// Step 1: Extract text from PDF and return to frontend
router.post('/upload-pdf', adminOnly, upload.single('pdf'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No PDF file uploaded' });

    try {
        const buffer = req.file.buffer;
        const uint8Array = new Uint8Array(buffer);
        const pdfInstance = new PDFParse(uint8Array);
        const pdfResult = await pdfInstance.getText();
        const text = pdfResult.text;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ error: 'Could not extract text from PDF' });
        }

        res.json({ success: true, text: text.trim().substring(0, 8000) });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'PDF extraction failed: ' + e.message });
    }
});

// Step 2: Save a manually-filled question
router.post('/save-question', adminOnly, async (req, res) => {
    const { title, description, difficulty, starter_code, test_cases } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'Title and description are required' });

    try {
        const db = await getDb();
        const result = run(db,
            `INSERT INTO questions (title, description, difficulty, starter_code, test_cases) VALUES (?,?,?,?,?)`,
            [
                title,
                description,
                difficulty || 'Medium',
                JSON.stringify(starter_code || {}),
                JSON.stringify(test_cases || [])
            ]);
        res.json({ success: true, id: result.lastInsertRowid, title });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Save failed: ' + e.message });
    }
});

module.exports = { router, adminOnly };
