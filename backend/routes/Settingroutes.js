const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');

// Get admin settings
router.get('/', async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({ username: 'Admin User', twoFactor: true, emailAlerts: true });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update admin settings
router.put('/', async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting(req.body);
    } else {
      settings.username = req.body.username || settings.username;
      settings.twoFactor = req.body.twoFactor ?? settings.twoFactor;
      settings.emailAlerts = req.body.emailAlerts ?? settings.emailAlerts;
    }
    const updatedSettings = await settings.save();
    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;