const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, default: "guest_user" },
  items: [
    {
      title: String,
      price: Number,
      quantity: Number,
      size: String,
      color: String
    }
  ],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 15 },
  total: { type: Number, required: true },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);