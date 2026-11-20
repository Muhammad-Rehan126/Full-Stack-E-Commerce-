const express = require('express');
const router = express.Router();
const { subscribeNewsletter } = require('../controllers/NewsletterController.js');

// Newsletter subscription route
router.post('/subscribe', subscribeNewsletter);

module.exports = router;