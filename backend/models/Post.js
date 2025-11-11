// Post model - defines how posts are stored in MongoDB
const mongoose = require("mongoose");

// Define the structure of post data
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true, // Post content is required
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // References a User ID
      ref: "User", // Links to User model
      required: true,
    },
    authorName: {
      type: String,
      required: true, // Store author name for easy display
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Post model
module.exports = mongoose.model("Post", postSchema);
