const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { getDb } = require('../db');
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');
const Question = require('../models/Question');
const Session = require('../models/Session');
const Submission = require('../models/Submission');

router.use(authenticate);

function adminOnly(req, res, next) {
    if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    next();
}

// GET /api/admin/users
router.get('/users', adminOnly, async (req, res) => {
    try {
        await getDb();
        const users = await User.find({}).sort({ created_at: -1 }).select('-password');
        res.json(users);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/admin/users
router.post('/users', adminOnly, async (req, res) => {
    const { username, password, allowed_languages } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    try {
        await getDb();
        const existing = await User.findOne({ username });
        if (existing) return res.status(409).json({ error: 'Username already taken' });
        const hash = bcrypt.hashSync(password, 10);
        const user = await User.create({
            username, password: hash, role: 'user',
            allowed_languages: allowed_languages || ['java', 'python', 'javascript', 'cpp', 'c']
        });
        res.json({ id: user._id, username, allowed_languages: user.allowed_languages });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT /api/admin/users/:id
router.put('/users/:id', adminOnly, async (req, res) => {
    const { password, allowed_languages, reset_questions } = req.body;
    try {
        await getDb();
        const update = {};
        if (password) update.password = bcrypt.hashSync(password, 10);
        if (allowed_languages) update.allowed_languages = allowed_languages;
        if (reset_questions) update.seen_questions = [];
        await User.findByIdAndUpdate(req.params.id, update);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', adminOnly, async (req, res) => {
    try {
        await getDb();
        await User.findOneAndDelete({ _id: req.params.id, role: { $ne: 'admin' } });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/admin/questions
router.get('/questions', adminOnly, async (req, res) => {
    try {
        await getDb();
        const qs = await Question.find({}).sort({ created_at: -1 });
        res.json(qs.map(q => ({
            id: q._id, title: q.title, description: q.description,
            difficulty: q.difficulty,
            test_cases: JSON.parse(q.test_cases),
            starter_code: q.starter_code ? JSON.parse(q.starter_code) : {}
        })));
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/admin/questions
router.post('/questions', adminOnly, async (req, res) => {
    const { title, description, difficulty, starter_code, test_cases } = req.body;
    if (!title || !description || !test_cases) return res.status(400).json({ error: 'title, description, test_cases required' });
    try {
        await getDb();
        const q = await Question.create({
            title, description, difficulty: difficulty || 'Easy',
            starter_code: JSON.stringify(starter_code || {}),
            test_cases: JSON.stringify(test_cases)
        });
        res.json({ id: q._id, title });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT /api/admin/questions/:id
router.put('/questions/:id', adminOnly, async (req, res) => {
    const { title, description, difficulty, starter_code, test_cases } = req.body;
    try {
        await getDb();
        await Question.findByIdAndUpdate(req.params.id, {
            title, description, difficulty,
            starter_code: JSON.stringify(starter_code || {}),
            test_cases: JSON.stringify(test_cases)
        });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE /api/admin/questions/:id
router.delete('/questions/:id', adminOnly, async (req, res) => {
    try {
        await getDb();
        await Question.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/admin/stats
router.get('/stats', adminOnly, async (req, res) => {
    try {
        await getDb();
        const sessions = await Session.find({}).sort({ started_at: -1 }).lean();
        const result = [];
        for (const s of sessions) {
            const user = await User.findById(s.user_id).select('username');
            const subs = await Submission.find({ session_id: s._id }).lean();
            result.push({
                id: s._id,
                user_id: s.user_id,
                username: user?.username || 'Unknown',
                score: s.score,
                total: s.total,
                status: s.status,
                started_at: s.started_at,
                submitted_at: s.submitted_at,
                details: subs
            });
        }
        res.json(result);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/admin/upload-pdf
const upload = multer({ storage: multer.memoryStorage() });
router.post('/upload-pdf', adminOnly, upload.single('pdf'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No PDF file uploaded' });
    try {
        const pdfParse = require('pdf-parse');
        const data = await pdfParse(req.file.buffer);
        res.json({ success: true, text: data.text.trim().substring(0, 8000) });
    } catch (e) {
        res.status(500).json({ error: 'PDF extraction failed: ' + e.message });
    }
});

// POST /api/admin/save-question
router.post('/save-question', adminOnly, async (req, res) => {
    const { title, description, difficulty, starter_code, test_cases } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'Title and description are required' });
    try {
        await getDb();
        const q = await Question.create({
            title, description, difficulty: difficulty || 'Medium',
            starter_code: JSON.stringify(starter_code || {}),
            test_cases: JSON.stringify(test_cases || [])
        });
        res.json({ success: true, id: q._id, title });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = { router, adminOnly };
