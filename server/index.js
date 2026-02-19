const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/session', require('./routes/session'));
app.use('/api/run', require('./routes/run').router);
app.use('/api/submit', require('./routes/submit'));
app.use('/api/admin', require('./routes/admin').router);

app.get('/', (req, res) => res.json({ status: 'Coding Platform API running ✅' }));

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
