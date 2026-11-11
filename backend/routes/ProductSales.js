const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get products available for sales
router.get('/', async (req, res) => {
  try {
    const salesProducts = await Product.find();
    res.status(200).json(salesProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;