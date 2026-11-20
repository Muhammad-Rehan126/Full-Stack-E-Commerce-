const requireAdmin = (req, res, next) => {
  // Aap yahan apna admin authentication token ya role check kar sakte hain
  const isAdmin = req.headers.admin_token === process.env.ADMIN_SECRET_KEY;
  
  if (isAdmin) {
    next();
  } else {
    res.status(403).json({ success: false, message: "Access denied. Admin only." });
  }
};

module.exports = requireAdmin;