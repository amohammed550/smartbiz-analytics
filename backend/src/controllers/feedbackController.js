const { validationResult } = require('express-validator');
// Demo mode - no database dependency
// const Feedback = require('../models/Feedback');
const { analyzeFeedback } = require('../utils/aiService');

// In-memory storage for demo (replace with database in production)
let demoFeedbackStore = [];

// @desc    Create feedback - DEMO MODE
// @route   POST /api/feedback
// @access  Private
exports.createFeedback = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { content } = req.body;

    // Input sanitization - limit length
    if (content && content.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Feedback content is too long. Maximum 5000 characters allowed.',
      });
    }

    // Analyze feedback using AI
    let analysis;
    try {
      analysis = await analyzeFeedback(content);
    } catch (aiError) {
      console.error('AI Analysis Error:', aiError);
      // Fallback analysis
      analysis = {
        sentiment: 'neutral',
        sentimentScore: 0.5,
        summary: 'Unable to analyze feedback at this time.',
        recommendations: [
          'Review the feedback manually',
          'Consider customer follow-up',
          'Monitor similar feedback patterns',
        ],
      };
    }

    // Create feedback object (demo mode - in-memory)
    const feedback = {
      _id: `feedback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      user: req.user.id,
      content: content.trim(),
      sentiment: analysis.sentiment,
      sentimentScore: analysis.sentimentScore,
      summary: analysis.summary,
      recommendations: analysis.recommendations,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store in memory (demo mode)
    demoFeedbackStore.push(feedback);

    res.status(201).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all feedback for logged in user - DEMO MODE
// @route   GET /api/feedback
// @access  Private
exports.getFeedback = async (req, res, next) => {
  try {
    // Filter feedback by user (demo mode)
    const feedback = demoFeedbackStore
      .filter(f => f.user === req.user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: feedback.length,
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single feedback - DEMO MODE
// @route   GET /api/feedback/:id
// @access  Private
exports.getSingleFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Input validation
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid feedback ID',
      });
    }

    const feedback = demoFeedbackStore.find(f => f._id === id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    // Make sure user owns the feedback
    if (feedback.user !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this feedback',
      });
    }

    res.json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get analytics - DEMO MODE
// @route   GET /api/feedback/analytics
// @access  Private
exports.getAnalytics = async (req, res, next) => {
  try {
    // Filter feedback by user (demo mode)
    const feedback = demoFeedbackStore.filter(f => f.user === req.user.id);

    const totalCount = feedback.length;
    const positiveCount = feedback.filter(f => f.sentiment === 'positive').length;
    const negativeCount = feedback.filter(f => f.sentiment === 'negative').length;
    const neutralCount = feedback.filter(f => f.sentiment === 'neutral').length;

    // Get all unique recommendations
    const allRecommendations = feedback
      .flatMap(f => (Array.isArray(f.recommendations) ? f.recommendations : []))
      .filter((rec, index, self) => rec && self.indexOf(rec) === index)
      .slice(0, 10); // Limit to top 10 unique recommendations

    res.json({
      success: true,
      data: {
        totalCount,
        positiveCount,
        negativeCount,
        neutralCount,
        recommendations: allRecommendations,
      },
    });
  } catch (error) {
    next(error);
  }
};

