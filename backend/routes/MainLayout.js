const express = require('express');
const router = express.Router();

// Main layout info or user session check route
router.get('/', async (req, res) => {
  try {
    res.status(200).json({ 
      appName: 'BERRY', 
      status: 'Active',
      adminUser: 'Admin User' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;