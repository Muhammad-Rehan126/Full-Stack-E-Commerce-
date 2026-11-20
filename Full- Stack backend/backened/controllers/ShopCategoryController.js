const Product = require('../models/Product');

exports.getShopProducts = async (req, res) => {
  try {
    const { category, color, style, size, minPrice, maxPrice, page, sort } = req.query;
    let query = {};

    // Filters mapping
    if (category) query.category = category;
    if (color) query.color = color;
    if (style) query.style = style;
    if (size) query.size = size;
    if (page) query.page = Number(page);

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let productsQuery = Product.find(query);

    // Sorting logic
    if (sort === 'Price: Low to High') {
      productsQuery = productsQuery.sort({ price: 1 });
    } else if (sort === 'Price: High to Low') {
      productsQuery = productsQuery.sort({ price: -1 });
    }

    const products = await productsQuery.exec();
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};