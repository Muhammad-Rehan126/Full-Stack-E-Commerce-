const express = require('express');
const router = express.Router();
const { getHomePageData } = require('../controllers/homeController');

// GET /api/home
router.get('/', getHomePageData);

module.exports = router;