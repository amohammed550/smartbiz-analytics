const { validationResult } = require('express-validator');

// Demo user credentials (hardcoded for demo purposes)
const DEMO_USER = {
  email: 'demo@smartbiz.com',
  password: '123456',
  id: 'demo-user-123',
  name: 'Demo User',
};

// Demo token
const DEMO_TOKEN = 'demo-token-123';

// @desc    Register user - DISABLED FOR DEMO
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  return res.status(403).json({
    success: false,
    message: 'Registration is disabled for demo purposes. Please use demo@smartbiz.com / 123456',
  });
};

// @desc    Login user - DEMO MODE (no database)
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Input sanitization
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Normalize email (lowercase, trim)
    const normalizedEmail = email.toLowerCase().trim();

    // Check demo credentials
    if (normalizedEmail === DEMO_USER.email && password === DEMO_USER.password) {
      return res.json({
        success: true,
        token: DEMO_TOKEN,
        user: {
          id: DEMO_USER.id,
          name: DEMO_USER.name,
          email: DEMO_USER.email,
        },
      });
    }

    // Invalid credentials - don't reveal which field is wrong
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Use demo@smartbiz.com / 123456',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user - DEMO MODE
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    // Return demo user if token is valid (handled by middleware)
    res.json({
      success: true,
      user: {
        id: DEMO_USER.id,
        name: DEMO_USER.name,
        email: DEMO_USER.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

