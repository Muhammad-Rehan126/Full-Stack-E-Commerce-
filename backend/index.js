const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config({ path: path.resolve(__dirname, '../.env.development.local') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5001;
const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
);

app.use(cors({
  origin(origin, callback) {
    callback(null, !origin || allowedOrigins.has(origin));
  },
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('MongoDB connection failed:', error.name);
    res.status(503).json({ error: 'Database unavailable' });
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

const customerProductRoute = require('./routes/CustomerProduct');
const dashboardRoute = require('./routes/DashboardPage');
const mainLayoutRoute = require('./routes/MainLayout');
const manageProductRoute = require('./routes/ManageProduct');
const productSalesRoute = require('./routes/ProductSales');
const settingRoutes = require('./routes/Settingroutes');

app.use('/api/customers', customerProductRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/layout', mainLayoutRoute);
app.use('/api/products', manageProductRoute);
app.use('/api/sales', productSalesRoute);
app.use('/api/settings', settingRoutes);

if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Database connection failed:', error.name);
      process.exitCode = 1;
    });
}

module.exports = app;
