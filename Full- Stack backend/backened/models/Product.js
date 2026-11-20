const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  verified: { type: Boolean, default: true },
  text: { type: String, required: true },
  date: { type: String, required: true }
});

const productDetailsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  discount: { type: String },
  rating: { type: String, default: "4.5/5" },
  description: { type: String, required: true },
  colors: [String],
  sizes: [String],
  images: [String],
  reviews: [reviewSchema]
}, { timestamps: true });

module.exports = mongoose.model('ProductDetails', productDetailsSchema);