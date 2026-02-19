const express = require('express');
const router = express.Router();
const { getDb, query, run, get } = require('../db');
const { authenticate } = require('../middleware/auth');
const { executeCode, LANG_IDS } = require('./run');

router.post('/', authenticate, async (req, res) => {
    const { sessionId, answers } = req.body;
    try {
        const db = await getDb();
        const session = get(db, 'SELECT * FROM sessions WHERE id = ? AND user_id = ?', [sessionId, req.user.id]);
        if (!session) return res.status(404).json({ error: 'Session not found' });
        if (session.status === 'submitted') return res.status(400).json({ error: 'Already submitted' });

        let totalPassed = 0, totalTests = 0;
        const results = [];

        for (const answer of answers) {
            const question = get(db, 'SELECT * FROM questions WHERE id = ?', [answer.questionId]);
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
            run(db, `INSERT INTO submissions (session_id, user_id, question_id, code, language, passed, total, status) VALUES (?,?,?,?,?,?,?,?)`,
                [sessionId, req.user.id, answer.questionId, answer.code, answer.language, passed, testCases.length, passed === testCases.length ? 'accepted' : 'wrong_answer']);
            results.push({ questionId: answer.questionId, title: question.title, passed, total: testCases.length, testCases: tcResults });
        }

        const score = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 0;
        run(db, `UPDATE sessions SET status='submitted', submitted_at=CURRENT_TIMESTAMP, score=?, total=? WHERE id=?`, [score, totalTests, sessionId]);
        res.json({ score, totalPassed, totalTests, results });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
