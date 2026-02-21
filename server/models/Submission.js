const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    session_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    question_id: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    passed: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    status: { type: String, default: 'pending' },
    submitted_at: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
