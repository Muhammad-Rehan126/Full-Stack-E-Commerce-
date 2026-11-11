const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: String, default: '' },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      quantity: { type: Number, required: true },
      size: String,
      color: String,
      image: String
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Completed' },
  createdAt: { type: Date, default: Date.now }
});

orderSchema.pre('validate', function syncItemQuantities() {
  this.items.forEach((item) => {
    const quantity = item.quantity ?? item.qty;
    item.quantity = quantity;
    item.qty = quantity;
    item.productId = item.productId || '';
  });
});

module.exports = mongoose.model('Order', orderSchema);