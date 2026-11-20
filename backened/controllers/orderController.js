const mongoose = require('mongoose');

// Safe inline schema fallback
const orderSchema = new mongoose.Schema({
  userId: String,
  products: Array,
  totalAmount: Number,
  status: { type: String, default: 'Pending' }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ success: true, message: "Order created successfully!", data: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};