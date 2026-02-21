const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, default: 'Easy' },
    starter_code: { type: String },   // JSON string
    test_cases: { type: String, required: true }, // JSON string
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Question || mongoose.model('Question', questionSchema);
