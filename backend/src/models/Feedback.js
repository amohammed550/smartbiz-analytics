const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Feedback content is required'],
    trim: true,
    minlength: [10, 'Feedback must be at least 10 characters'],
  },
  sentiment: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    default: 'neutral',
  },
  sentimentScore: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    default: '',
  },
  recommendations: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Feedback', feedbackSchema);

