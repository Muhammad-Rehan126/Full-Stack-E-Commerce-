const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// 1. Root Route - "Cannot GET /" error ko khatam karne ke liye
app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'E-Commerce Backend is running successfully! 🚀' 
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working perfectly!' });
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully 📦'))
    .catch((err) => console.error('Database connection failed ❌:', err.message));
}

// Local development ke liye server start (Vercel isay ignore kar deta hai)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// ==========================================
// VERCEL KE LIYE SAB SE ZAROORI LINE:
// ==========================================
module.exports = app;