const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve the frontend (index.html) from the project root
app.use(express.static(path.join(__dirname, '..')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/session', require('./routes/session'));
app.use('/api/run', require('./routes/run').router);
app.use('/api/submit', require('./routes/submit'));
app.use('/api/admin', require('./routes/admin').router);

// Fallback: serve index.html for any unknown route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📦 Database: platform.db`);
    console.log(`\nEndpoints:`);
    console.log(`  POST /api/auth/register`);
    console.log(`  POST /api/auth/login`);
    console.log(`  POST /api/session/start`);
    console.log(`  GET  /api/session/current`);
    console.log(`  POST /api/run`);
    console.log(`  POST /api/run/test`);
    console.log(`  POST /api/submit\n`);
});
