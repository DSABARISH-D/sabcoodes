// api/index.js — Express app entry point for Vercel serverless
const path = require('path');
// Point DB path to /tmp on Vercel (writable), keep local path otherwise
process.env.DB_PATH = process.env.VERCEL
    ? '/tmp/platform.db'
    : path.join(__dirname, '..', 'server', 'platform.db');

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', 'server', '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, '..')));

// API Routes (re-use server route files)
app.use('/api/auth', require('../server/routes/auth'));
app.use('/api/session', require('../server/routes/session'));
app.use('/api/run', require('../server/routes/run').router);
app.use('/api/submit', require('../server/routes/submit'));
app.use('/api/admin', require('../server/routes/admin').router);

// Fallback to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

module.exports = app;
