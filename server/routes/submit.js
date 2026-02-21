const express = require('express');
const router = express.Router();
const { getDb } = require('../db');
const { authenticate } = require('../middleware/auth');
const { executeCode, LANG_IDS } = require('./run');
const Session = require('../models/Session');
const Question = require('../models/Question');
const Submission = require('../models/Submission');

router.post('/', authenticate, async (req, res) => {
    const { sessionId, answers } = req.body;
    try {
        await getDb();
        const session = await Session.findOne({ _id: sessionId, user_id: req.user.id });
        if (!session) return res.status(404).json({ error: 'Session not found' });
        if (session.status === 'submitted') return res.status(400).json({ error: 'Already submitted' });

        let totalPassed = 0, totalTests = 0;
        const results = [];

        for (const answer of answers) {
            const question = await Question.findById(answer.questionId);
            if (!question) continue;
            const testCases = JSON.parse(question.test_cases);
            const langId = LANG_IDS[answer.language] || 62;
            let passed = 0;
            const tcResults = [];

            for (const tc of testCases) {
                const result = await executeCode(answer.code, langId, tc.input);
                const ok = result.stdout.trim() === tc.expected.trim();
                if (ok) passed++;
                tcResults.push({ input: tc.input, expected: tc.expected, got: result.stdout.trim(), passed: ok, stderr: result.stderr });
            }

            totalPassed += passed;
            totalTests += testCases.length;
            await Submission.create({
                session_id: sessionId, user_id: req.user.id,
                question_id: answer.questionId, code: answer.code,
                language: answer.language, passed, total: testCases.length,
                status: passed === testCases.length ? 'accepted' : 'wrong_answer'
            });
            results.push({ questionId: answer.questionId, title: question.title, passed, total: testCases.length, testCases: tcResults });
        }

        const score = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 0;
        await Session.findByIdAndUpdate(sessionId, {
            status: 'submitted', submitted_at: new Date(), score, total: totalTests
        });
        res.json({ score, totalPassed, totalTests, results });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
