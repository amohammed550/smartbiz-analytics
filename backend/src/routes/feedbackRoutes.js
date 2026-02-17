const express = require('express');
const { body } = require('express-validator');
const {
  createFeedback,
  getFeedback,
  getSingleFeedback,
  getAnalytics,
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Validation rules with enhanced security
const feedbackValidation = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Feedback content is required')
    .isLength({ min: 10 })
    .withMessage('Feedback must be at least 10 characters')
    .isLength({ max: 5000 })
    .withMessage('Feedback must not exceed 5000 characters')
    .escape(), // XSS protection
];

router.post('/', feedbackValidation, createFeedback);
router.get('/', getFeedback);
router.get('/analytics', getAnalytics);
router.get('/:id', getSingleFeedback);

module.exports = router;

