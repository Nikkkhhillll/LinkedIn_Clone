// Authentication middleware - checks if user is logged in
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// This function runs before protected routes
// It checks if the user has a valid token
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    );

    // Get user from database
    const user = await User.findById(decoded.userId).select("-password"); // Don't include password

    if (!user) {
      return res.status(401).json({
        message: "Invalid token.",
      });
    }

    // Add user info to request object
    req.user = user;
    next(); // Continue to the next middleware/route
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      message: "Invalid token.",
    });
  }
};

module.exports = authenticateToken;
