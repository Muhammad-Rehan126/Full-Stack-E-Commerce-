const Product = require('../models/Product');
const Review = require('../models/Review');

exports.getHomePageData = async (req, res) => {
  try {
    // Fetch New Arrivals
    const newArrivals = await Product.find({ category: 'new-arrival' }).limit(4);

    // Fetch Top Selling products
    const topSelling = await Product.find({ category: 'top-selling' }).limit(4);

    // Fetch Happy Customers Reviews
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      success: true,
      data: {
        newArrivals,
        topSelling,
        reviews
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};