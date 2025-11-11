// Main server file for LinkedIn Clone
// This file starts our Express server and connects to MongoDB

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import our route files (we'll create these next)
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

// Create Express app
const app = express();

// Middleware - these run before our routes
app.use(cors()); // Allows frontend to connect to backend
app.use(express.json()); // Allows us to read JSON data from requests

// Connect to MongoDB database
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/linkedin-clone",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Routes - these handle different API endpoints
app.use("/api/auth", authRoutes); // All auth routes will start with /api/auth
app.use("/api/posts", postRoutes); // All post routes will start with /api/posts

// Basic route to test if server is working
app.get("/", (req, res) => {
  res.json({ message: "LinkedIn Clone Backend is running!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
