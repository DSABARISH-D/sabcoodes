const express = require('express');
const router = express.Router();
const axios = require('axios');
const { authenticate } = require('../middleware/auth');

// Judge0 language IDs
const LANG_IDS = {
    java: 62,
    python: 71,
    javascript: 63,
    cpp: 54,
    c: 50
};

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '';

// Free public Judge0 CE instances (no key required)
const FREE_ENDPOINTS = [
    'https://judge0-ce.p.rapidapi.com',  // used only if RAPIDAPI_KEY set
    'https://ce.judge0.com'              // free public instance
];

async function executeCode(code, languageId, stdin) {
    // --- Try RapidAPI (paid/free tier) if key is configured ---
    if (RAPIDAPI_KEY) {
        try {
            const res = await axios.post(
                'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
                { source_code: code, language_id: languageId, stdin: stdin || '', cpu_time_limit: 5, memory_limit: 128000 },
                {
                    headers: {
                        'X-RapidAPI-Key': RAPIDAPI_KEY,
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                        'Content-Type': 'application/json'
                    },
                    timeout: 15000
                }
            );
            const d = res.data;
            return {
                stdout: (d.stdout || '').trim(),
                stderr: d.stderr || d.compile_output || '',
                status: d.status?.description || 'Unknown'
            };
        } catch (e) {
            console.warn('RapidAPI Judge0 failed, falling back:', e.message);
        }
    }

    // --- Fallback: free public Judge0 CE instance ---
    try {
        // Step 1: submit
        const submitRes = await axios.post(
            'https://ce.judge0.com/submissions?base64_encoded=false',
            { source_code: code, language_id: languageId, stdin: stdin || '', cpu_time_limit: 5 },
            { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
        );
        const token = submitRes.data.token;
        if (!token) throw new Error('No token returned from Judge0');

        // Step 2: poll for result (up to 10 seconds)
        for (let i = 0; i < 10; i++) {
            await new Promise(r => setTimeout(r, 1000));
            const pollRes = await axios.get(
                `https://ce.judge0.com/submissions/${token}?base64_encoded=false`,
                { timeout: 8000 }
            );
            const d = pollRes.data;
            // status id 1=queued, 2=processing, 3+=done
            if (d.status && d.status.id >= 3) {
                return {
                    stdout: (d.stdout || '').trim(),
                    stderr: d.stderr || d.compile_output || '',
                    status: d.status.description || 'Done'
                };
            }
        }
        return { stdout: '', stderr: 'Execution timed out waiting for result', status: 'Timeout' };
    } catch (err) {
        console.error('Judge0 free instance error:', err.message);
        return { stdout: '', stderr: 'Code execution service unavailable: ' + err.message, status: 'Error' };
    }
}

// POST /api/run – run code against custom input
router.post('/', authenticate, async (req, res) => {
    const { code, language, stdin } = req.body;
    if (!code) return res.status(400).json({ error: 'No code provided' });
    const langId = LANG_IDS[language] || 62;
    const result = await executeCode(code, langId, stdin || '');
    res.json(result);
});

// POST /api/run/test – run code against a single test case
router.post('/test', authenticate, async (req, res) => {
    const { code, language, input, expected } = req.body;
    const langId = LANG_IDS[language] || 62;
    const result = await executeCode(code, langId, input || '');
    const passed = result.stdout.trim() === (expected || '').trim();
    res.json({ ...result, passed, expected });
});

module.exports = { router, executeCode, LANG_IDS };
