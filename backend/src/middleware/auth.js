// Demo mode - simplified authentication middleware
const DEMO_TOKEN = 'demo-token-123';
const DEMO_USER = {
  id: 'demo-user-123',
  name: 'Demo User',
  email: 'demo@smartbiz.com',
};

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }

    // Demo mode: accept demo token
    if (token === DEMO_TOKEN) {
      req.user = DEMO_USER;
      return next();
    }

    // Invalid token
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { protect };

