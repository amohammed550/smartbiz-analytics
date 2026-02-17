# Step-by-Step Local Setup Guide

Follow these steps to run SmartBiz Analytics on your local machine.

## Prerequisites

Before starting, ensure you have:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - Either:
  - Local MongoDB installation, OR
  - MongoDB Atlas account (free tier available) - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

---

## Step 1: Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install all npm packages
npm install
```

**Expected output:** You should see packages being installed. Wait for it to complete.

---

## Step 2: Install Frontend Dependencies

```bash
# From project root, navigate to frontend directory
cd ../frontend

# Install all npm packages
npm install
```

**Expected output:** You should see packages being installed. Wait for it to complete.

---

## Step 3: Set Up MongoDB Database

### Option A: Using Local MongoDB

1. **Start MongoDB service:**
   ```bash
   # On macOS (if installed via Homebrew)
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   
   # On Windows
   # MongoDB should start automatically as a service
   ```

2. **Verify MongoDB is running:**
   ```bash
   # Test connection
   mongosh
   # If connected, type 'exit' to leave
   ```

3. **Your MongoDB URI will be:**
   ```
   mongodb://localhost:27017/smartbiz-analytics
   ```

### Option B: Using MongoDB Atlas (Cloud)

1. **Create a free account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a new cluster** (free tier M0)

3. **Create a database user:**
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Save the username and password

4. **Whitelist your IP:**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your IP

5. **Get your connection string:**
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `smartbiz-analytics`
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smartbiz-analytics`

---

## Step 4: Get OpenAI API Key

1. **Sign up/Login** at [platform.openai.com](https://platform.openai.com/)

2. **Navigate to API Keys:**
   - Go to: https://platform.openai.com/api-keys

3. **Create a new secret key:**
   - Click "Create new secret key"
   - Give it a name (e.g., "SmartBiz Analytics")
   - Copy the key immediately (you won't see it again!)

4. **Add credits to your account** (if needed):
   - Go to "Billing" → "Add payment method"
   - Add at least $5-10 for testing

---

## Step 5: Create Backend .env File

```bash
# From project root, navigate to backend
cd backend

# Create .env file (on macOS/Linux)
touch .env

# Or on Windows
# type nul > .env
```

**Edit the `.env` file** with your favorite text editor and add:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartbiz-analytics
# OR for MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smartbiz-analytics

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-make-it-long-and-random
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
NODE_ENV=development
```

**Important Notes:**
- Replace `MONGODB_URI` with your actual MongoDB connection string
- Replace `JWT_SECRET` with a long, random string (e.g., use a password generator)
- Replace `OPENAI_API_KEY` with your actual OpenAI API key (starts with `sk-`)

**Example of a good JWT_SECRET:**
```bash
# Generate a random secret (on macOS/Linux)
openssl rand -base64 32
```

---

## Step 6: Create Frontend .env File (Optional)

```bash
# From project root, navigate to frontend
cd frontend

# Create .env file
touch .env
```

**Edit the `.env` file** and add:

```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** This is optional. If you don't create this file, the frontend will default to `/api` which works with the Vite proxy configuration.

---

## Step 7: Start the Backend Server

```bash
# Make sure you're in the backend directory
cd backend

# Start the server in development mode (with auto-reload)
npm run dev

# OR start in production mode
npm start
```

**Expected output:**
```
Server running on port 5000
MongoDB Connected: localhost:27017
```

**Keep this terminal window open!** The server needs to keep running.

**If you see errors:**
- **MongoDB connection error:** Check your MongoDB is running and `MONGODB_URI` is correct
- **Port already in use:** Change `PORT` in `.env` to another port (e.g., 5001)
- **OpenAI API error:** Verify your API key is correct and you have credits

---

## Step 8: Start the Frontend Server

**Open a NEW terminal window/tab** (keep backend running in the first one):

```bash
# Navigate to frontend directory
cd frontend

# Start the development server
npm run dev
```

**Expected output:**
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**The frontend will automatically open in your browser at `http://localhost:3000`**

---

## Step 9: Test the Application

1. **Open your browser** to `http://localhost:3000`

2. **Register a new account:**
   - Click "Sign up" or go to `/register`
   - Fill in:
     - Name: Your name
     - Email: your-email@example.com
     - Password: (at least 6 characters)
     - Confirm Password: (same as password)
   - Click "Sign up"

3. **You should be redirected to the Dashboard**

4. **Submit your first feedback:**
   - In the "Submit Customer Feedback" form, enter some text (minimum 10 characters)
   - Example: "The customer service was excellent and very helpful. I'm very satisfied with the product quality."
   - Click "Analyze Feedback"
   - Wait for AI analysis (may take a few seconds)

5. **View the results:**
   - Check the analytics cards at the top
   - See the sentiment analysis
   - Review AI-generated recommendations
   - View your feedback in the "Recent Feedback" section

---

## Troubleshooting

### Backend won't start

**Error: "Cannot find module 'xxx'"**
```bash
cd backend
npm install
```

**Error: "MongoDB connection failed"**
- Verify MongoDB is running: `mongosh` or check MongoDB service
- Check `MONGODB_URI` in `.env` is correct
- For Atlas: Check IP whitelist and credentials

**Error: "Port 5000 already in use"**
- Change `PORT=5001` in backend `.env`
- Update frontend `.env` to `VITE_API_URL=http://localhost:5001/api`

### Frontend won't start

**Error: "Cannot find module 'xxx'"**
```bash
cd frontend
npm install
```

**Error: "Failed to fetch" or API errors**
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

### OpenAI API Errors

**Error: "Invalid API key"**
- Verify your API key in backend `.env`
- Make sure there are no extra spaces
- Check you copied the full key (starts with `sk-`)

**Error: "Insufficient quota"**
- Add credits to your OpenAI account
- Check billing at platform.openai.com

### Database Issues

**No data showing up**
- Check MongoDB connection in backend logs
- Verify database name matches in `MONGODB_URI`
- Try creating a new user/feedback entry

---

## Quick Command Reference

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Start backend (Terminal 1)
cd backend && npm run dev

# Start frontend (Terminal 2)
cd frontend && npm run dev

# Access application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
```

---

## Next Steps

Once everything is running:
- ✅ Test user registration and login
- ✅ Submit multiple feedback entries
- ✅ Explore the analytics dashboard
- ✅ Review AI-generated recommendations
- ✅ Check the feedback history

**Happy coding! 🚀**

