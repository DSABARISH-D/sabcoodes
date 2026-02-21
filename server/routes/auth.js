const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../db');
const User = require('../models/User');

const SECRET = process.env.JWT_SECRET || 'codeplatform_secret_2024';

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    try {
        await getDb();
        const existing = await User.findOne({ username });
        if (existing) return res.status(409).json({ error: 'Username already taken' });
        const hash = bcrypt.hashSync(password, 10);
        const user = await User.create({ username, password: hash });
        const token = jwt.sign({ id: user._id, username, role: 'user' }, SECRET, { expiresIn: '8h' });
        res.json({ token, username, role: 'user', id: user._id });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        await getDb();
        const user = await User.findOne({ username });
        if (!user || !bcrypt.compareSync(password, user.password))
            return res.status(401).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, SECRET, { expiresIn: '8h' });
        res.json({ token, username: user.username, role: user.role, id: user._id });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
