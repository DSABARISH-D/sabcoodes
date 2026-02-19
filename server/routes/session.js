const express = require('express');
const router = express.Router();
const { getDb, query, run, get } = require('../db');
const { authenticate } = require('../middleware/auth');

router.post('/start', authenticate, async (req, res) => {
    try {
        const db = await getDb();
        const userId = req.user.id;

        // Check for existing active session
        const existing = get(db, `SELECT * FROM sessions WHERE user_id = ? AND status = 'active'`, [userId]);
        if (existing) {
            const qIds = JSON.parse(existing.question_ids);
            const questions = qIds.map(id => get(db, 'SELECT id,title,description,difficulty,starter_code,test_cases FROM questions WHERE id=?', [id])).filter(Boolean);

            // If questions found, return them. logic: if we found at least 1, verify. 
            // Better: if we found ALL. But for robustness, if we found > 0.
            if (questions.length > 0) {
                const user = get(db, 'SELECT allowed_languages FROM users WHERE id=?', [userId]);
                return res.json({
                    sessionId: existing.id,
                    questions,
                    allowedLanguages: JSON.parse(user?.allowed_languages || '["java","python","javascript","cpp","c"]')
                });
            }

            // If active session has invalid questions (e.g. DB reseeded), invalidate it
            run(db, "UPDATE sessions SET status='abandoned' WHERE id=?", [existing.id]);
        }

        // Get user's seen questions and allowed languages
        const user = get(db, 'SELECT allowed_languages, seen_questions FROM users WHERE id=?', [userId]);
        const seenIds = JSON.parse(user?.seen_questions || '[]');
        const allowedLangs = JSON.parse(user?.allowed_languages || '["java","python","javascript","cpp","c"]');

        // Get all questions excluding already-seen ones
        let available = query(db, 'SELECT id FROM questions');
        let unseen = available.filter(q => !seenIds.includes(q.id));

        // If not enough unseen questions, reset (allow repeats from the full pool excluding last session)
        if (unseen.length < 2) {
            unseen = available; // reset — all questions available again
            run(db, 'UPDATE users SET seen_questions = ? WHERE id = ?', ['[]', userId]);
        }

        // Pick 2 random from unseen
        const shuffled = unseen.sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, 2);
        const qIds = picked.map(q => q.id);

        // Mark these questions as seen for this user
        const newSeen = JSON.stringify([...new Set([...seenIds, ...qIds])]);
        run(db, 'UPDATE users SET seen_questions = ? WHERE id = ?', [newSeen, userId]);

        // Create session
        const session = run(db, `INSERT INTO sessions (user_id, question_ids, total) VALUES (?,?,?)`,
            [userId, JSON.stringify(qIds), qIds.length * 5]);

        const questions = qIds.map(id => get(db, 'SELECT id,title,description,difficulty,starter_code,test_cases FROM questions WHERE id=?', [id])).filter(Boolean);

        res.json({ sessionId: session.lastInsertRowid, questions, allowedLanguages: allowedLangs });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/current', authenticate, async (req, res) => {
    try {
        const db = await getDb();
        const session = get(db, `SELECT * FROM sessions WHERE user_id = ? AND status = 'active' ORDER BY started_at DESC LIMIT 1`, [req.user.id]);
        if (!session) return res.status(404).json({ error: 'No active session' });
        const qIds = JSON.parse(session.question_ids);
        const questions = qIds.map(id => get(db, 'SELECT id,title,description,difficulty,starter_code,test_cases FROM questions WHERE id=?', [id])).filter(Boolean);
        const user = get(db, 'SELECT allowed_languages FROM users WHERE id=?', [req.user.id]);
        res.json({
            sessionId: session.id,
            questions,
            startedAt: session.started_at,
            allowedLanguages: JSON.parse(user?.allowed_languages || '["java","python","javascript","cpp","c"]')
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
