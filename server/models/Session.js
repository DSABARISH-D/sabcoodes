const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    question_ids: { type: [String], required: true },
    started_at: { type: Date, default: Date.now },
    submitted_at: { type: Date },
    score: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    status: { type: String, default: 'active' }
});

module.exports = mongoose.models.Session || mongoose.model('Session', sessionSchema);
