const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb, query, run, get } = require('../db');

const SECRET = process.env.JWT_SECRET || 'codeplatform_secret_2024';

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    try {
        const db = await getDb();
        const existing = get(db, 'SELECT id FROM users WHERE username = ?', [username]);
        if (existing) return res.status(409).json({ error: 'Username already taken' });
        const hash = bcrypt.hashSync(password, 10);
        const result = run(db, 'INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]);
        const token = jwt.sign({ id: result.lastInsertRowid, username, role: 'user' }, SECRET, { expiresIn: '8h' });
        res.json({ token, username, role: 'user', id: result.lastInsertRowid });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const db = await getDb();
        const user = get(db, 'SELECT * FROM users WHERE username = ?', [username]);
        if (!user || !bcrypt.compareSync(password, user.password))
            return res.status(401).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET, { expiresIn: '8h' });
        res.json({ token, username: user.username, role: user.role, id: user.id });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
