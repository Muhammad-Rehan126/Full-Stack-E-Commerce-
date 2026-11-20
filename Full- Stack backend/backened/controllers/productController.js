const mongoose = require('mongoose');

// Safe model loader with inline fallback if model file is missing
let ProductDetails;
try {
  ProductDetails = require('../models/ProductDetails');
} catch (e) {
  const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    reviews: [{ name: String, verified: Boolean, text: String, date: String }]
  });
  ProductDetails = mongoose.models.ProductDetails || mongoose.model('ProductDetails', productSchema);
}

// Get product details by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await ProductDetails.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a review to a product
exports.addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, text } = req.body;

    if (!name || !text) {
      return res.status(400).json({ success: false, message: "Name and text are required" });
    }

    const currentDate = new Date().toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });

    const product = await ProductDetails.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const newReview = { name, verified: true, text, date: currentDate };
    if (!product.reviews) {
      product.reviews = [];
    }
    product.reviews.unshift(newReview); // Add review to the beginning of the array
    await product.save();

    res.status(201).json({ success: true, message: "Review added successfully!", data: product.reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};