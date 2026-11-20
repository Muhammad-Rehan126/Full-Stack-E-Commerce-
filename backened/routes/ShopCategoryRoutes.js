const express = require('express');
const router = express.Router();
const { getShopProducts } = require('../controllers/ShopCategoryController');

// GET /api/shop/products?page=5&size=Large&minPrice=50&maxPrice=250
router.get('/products', getShopProducts);

module.exports = router;