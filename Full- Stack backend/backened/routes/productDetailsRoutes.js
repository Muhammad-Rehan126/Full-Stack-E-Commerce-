const express = require('express');
const router = express.Router();
const { getProductById, addReview } = require('../controllers/productController');

// Product details routes
router.get('/:id', getProductById);
router.post('/:id/reviews', addReview);

module.exports = router;