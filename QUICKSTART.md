# Quick Start Guide

## 🚀 Fast Setup (Copy & Paste)

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Setup Environment Variables

**Backend `.env` file** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartbiz-analytics
JWT_SECRET=change-this-to-a-random-secret-key
OPENAI_API_KEY=sk-your-openai-api-key-here
NODE_ENV=development
```

**Frontend `.env` file** (`frontend/.env`) - Optional:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
# macOS (Homebrew)
brew services start mongodb-community

# Or check if already running
mongosh
```

**MongoDB Atlas:** Use connection string in `MONGODB_URI`

### 4. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Open Browser

Visit: **http://localhost:3000**

---

## 📋 Checklist

- [ ] Node.js installed (v16+)
- [ ] MongoDB running (local or Atlas)
- [ ] OpenAI API key obtained
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Frontend dependencies installed (`cd frontend && npm install`)
- [ ] Backend `.env` file created with correct values
- [ ] Frontend `.env` file created (optional)
- [ ] Backend server running (`npm run dev` in backend/)
- [ ] Frontend server running (`npm run dev` in frontend/)
- [ ] Browser opened to http://localhost:3000

---

## 🔧 Common Issues

| Issue | Solution |
|-------|----------|
| `npm install` fails | Check Node.js version: `node -v` (needs v16+) |
| MongoDB connection error | Start MongoDB or check Atlas connection string |
| Port 5000 in use | Change `PORT=5001` in backend `.env` |
| OpenAI API error | Verify API key and account credits |
| Frontend can't connect | Ensure backend is running on port 5000 |

---

For detailed instructions, see [SETUP.md](./SETUP.md)

