const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  username: { type: String, required: true, default: 'Admin User' },
  twoFactor: { type: Boolean, default: true },
  emailAlerts: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);