const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  lastOrder: { type: String, default: '0.0%' },
  spent: { type: String, default: '$0.00' },
  segment: { type: String, default: 'Customer Segment' },
  status: { type: String, default: 'Active' }
});

module.exports = mongoose.model('Customer', customerSchema);