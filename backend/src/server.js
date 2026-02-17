// Load .env only in development; production uses platform env vars
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
// Temporarily disabled MongoDB connection
// const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const {
  securityHeaders,
  apiLimiter,
  sanitizeData,
  xssProtection,
} = require('./middleware/security');

// Connect to database - TEMPORARILY DISABLED
// connectDB();

const app = express();

// Security Middleware (must be first)
app.use(securityHeaders);
app.use(sanitizeData);
app.use(xssProtection);

// CORS Configuration (no localhost fallback in production)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : (process.env.FRONTEND_URL || 'http://localhost:3200'),
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Rate limiting
app.use('/api/', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
  });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5500;

if (process.env.NODE_ENV === 'production' && !process.env.FRONTEND_URL) {
  console.warn('Warning: FRONTEND_URL is not set in production. CORS may not work as expected.');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

