const mongoose = require('mongoose');

// Define Newsletter Schema directly if model file is missing
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
});

const NewslettersSubscriber = mongoose.models.NewslettersSubscriber || mongoose.model('NewslettersSubscriber', newsletterSchema);

exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Check if email already exists
    let existing = await NewslettersSubscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "This email is already subscribed!" });
    }

    // Save new subscriber
    await NewslettersSubscriber.create({ email });
    res.status(201).json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};