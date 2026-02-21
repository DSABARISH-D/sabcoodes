const express = require('express');
const router = express.Router();
const { getDb } = require('../db');
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');
const Question = require('../models/Question');
const Session = require('../models/Session');

router.post('/start', authenticate, async (req, res) => {
    try {
        await getDb();
        const userId = req.user.id;

        // Check for existing active session
        const existing = await Session.findOne({ user_id: userId, status: 'active' });
        if (existing) {
            const questions = await Question.find({ _id: { $in: existing.question_ids } })
                .select('_id title description difficulty starter_code test_cases');
            if (questions.length > 0) {
                const user = await User.findById(userId);
                return res.json({
                    sessionId: existing._id,
                    questions: questions.map(formatQuestion),
                    allowedLanguages: user?.allowed_languages || ['java', 'python', 'javascript', 'cpp', 'c']
                });
            }
            // Invalid session — abandon it
            await Session.findByIdAndUpdate(existing._id, { status: 'abandoned' });
        }

        // Get user info
        const user = await User.findById(userId);
        const seenIds = user?.seen_questions || [];
        const allowedLangs = user?.allowed_languages || ['java', 'python', 'javascript', 'cpp', 'c'];

        // Get unseen questions
        const allQuestions = await Question.find({});
        let unseen = allQuestions.filter(q => !seenIds.includes(String(q._id)));

        if (unseen.length < 2) {
            unseen = allQuestions;
            await User.findByIdAndUpdate(userId, { seen_questions: [] });
        }

        // Pick 2 random
        const shuffled = unseen.sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, 2);
        const qIds = picked.map(q => String(q._id));

        // Mark as seen
        const newSeen = [...new Set([...seenIds, ...qIds])];
        await User.findByIdAndUpdate(userId, { seen_questions: newSeen });

        // Create session
        const session = await Session.create({
            user_id: userId,
            question_ids: qIds,
            total: qIds.length * 5
        });

        res.json({
            sessionId: session._id,
            questions: picked.map(formatQuestion),
            allowedLanguages: allowedLangs
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/current', authenticate, async (req, res) => {
    try {
        await getDb();
        const session = await Session.findOne({ user_id: req.user.id, status: 'active' }).sort({ started_at: -1 });
        if (!session) return res.status(404).json({ error: 'No active session' });
        const questions = await Question.find({ _id: { $in: session.question_ids } });
        const user = await User.findById(req.user.id);
        res.json({
            sessionId: session._id,
            questions: questions.map(formatQuestion),
            startedAt: session.started_at,
            allowedLanguages: user?.allowed_languages || ['java', 'python', 'javascript', 'cpp', 'c']
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

function formatQuestion(q) {
    return {
        id: q._id,
        title: q.title,
        description: q.description,
        difficulty: q.difficulty,
        starter_code: q.starter_code,
        test_cases: q.test_cases
    };
}

module.exports = router;
