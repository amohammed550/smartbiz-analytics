# SmartBiz Analytics

A full-stack SaaS web application that helps small business owners analyze customer feedback using AI-powered sentiment analysis and generate actionable business recommendations.

## Features

- 🔐 **Secure Authentication**: JWT-based user authentication with registration and login
- 📝 **Feedback Management**: Submit and store customer feedback entries
- 🤖 **AI-Powered Analysis**: Automatic sentiment analysis using OpenAI GPT-3.5
- 📊 **Analytics Dashboard**: Real-time insights with sentiment breakdown
- 💡 **Smart Recommendations**: AI-generated business improvement suggestions
- 📱 **Responsive Design**: Mobile-friendly interface built with TailwindCSS
- ✅ **Input Validation**: Comprehensive form validation on both frontend and backend
- 🛡️ **Protected Routes**: Secure dashboard access with authentication middleware

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **OpenAI API** - AI-powered analysis
- **Express Validator** - Input validation
- **Bcrypt** - Password hashing

## Project Structure

```
SmartBiz-Analytics/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── feedbackController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Feedback.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── feedbackRoutes.js
│   │   ├── utils/
│   │   │   └── aiService.js
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── feedbackService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .gitignore
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SmartBiz-Analytics
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartbiz-analytics
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartbiz-analytics

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
OPENAI_API_KEY=your-openai-api-key-here
NODE_ENV=development
```

**Important**: 
- Replace `JWT_SECRET` with a strong, random string for production
- Add your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file (optional, defaults to /api)
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For local MongoDB
mongod

# Or if using MongoDB as a service
# MongoDB should start automatically
```

### 5. Run the Application

#### Start Backend Server

```bash
# From backend directory
npm run dev
# or
npm start
```

The backend server will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
# From frontend directory (in a new terminal)
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/me` - Get current user (Protected)

### Feedback

- `POST /api/feedback` - Create feedback (Protected)
  ```json
  {
    "content": "Customer feedback text here..."
  }
  ```

- `GET /api/feedback` - Get all feedback for user (Protected)
- `GET /api/feedback/:id` - Get single feedback (Protected)
- `GET /api/feedback/analytics` - Get analytics data (Protected)

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Submit Feedback**: Enter customer feedback in the dashboard form
3. **View Analytics**: See sentiment breakdown and total feedback count
4. **Get Recommendations**: Review AI-generated business recommendations
5. **Browse History**: View all submitted feedback with analysis results

## Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `OPENAI_API_KEY` | OpenAI API key | Yes |
| `NODE_ENV` | Environment (development/production) | No |

### Frontend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | No (default: /api) |

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## Error Handling

- Centralized error handling middleware
- User-friendly error messages
- Validation error responses
- Loading states for better UX

## Development

### Backend Development

```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development

```bash
cd frontend
npm run dev  # Vite dev server with hot reload
```

## Production Build

### Frontend

```bash
cd frontend
npm run build
```

The build output will be in the `dist/` directory.

### Backend

```bash
cd backend
npm start
```

Make sure to set `NODE_ENV=production` in your production environment.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Verify network connectivity for MongoDB Atlas

### OpenAI API Errors
- Verify your API key is correct
- Check your OpenAI account has credits
- Ensure API key has proper permissions

### CORS Issues
- Verify backend CORS configuration
- Check frontend API URL configuration
- Ensure both servers are running

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue on the repository.

---

Built with ❤️ for small business owners

