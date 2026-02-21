const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    allowed_languages: { type: [String], default: ['java', 'python', 'javascript', 'cpp', 'c'] },
    seen_questions: { type: [String], default: [] },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
