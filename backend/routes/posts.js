// Posts routes - handles creating and getting posts
const express = require("express");
const Post = require("../models/Post");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// CREATE POST ROUTE - Only logged in users can create posts
router.post("/", authenticateToken, async (req, res) => {
  try {
    // Get post content from request body
    const { content } = req.body;

    // Validation - check if content exists
    if (!content || content.trim() === "") {
      return res.status(400).json({
        message: "Post content is required",
      });
    }

    // Create new post
    const post = new Post({
      content: content.trim(),
      author: req.user._id, // User ID from auth middleware
      authorName: req.user.name, // User name from auth middleware
    });

    // Save post to database
    await post.save();

    // Send response
    res.status(201).json({
      message: "Post created successfully",
      post: {
        id: post._id,
        content: post.content,
        authorName: post.authorName,
        createdAt: post.createdAt,
      },
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({
      message: "Error creating post",
      error: error.message,
    });
  }
});

// GET ALL POSTS ROUTE - Anyone can view posts (but must be logged in)
router.get("/", authenticateToken, async (req, res) => {
  try {
    // Get all posts from database, sorted by newest first
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // -1 means descending order (newest first)
      .select("content authorName createdAt author"); // Include author field to check ownership

    // Send response
    res.json({
      message: "Posts retrieved successfully",
      posts: posts,
    });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({
      message: "Error retrieving posts",
      error: error.message,
    });
  }
});

// EDIT POST ROUTE - Users can only edit their own posts
router.put("/:postId", authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    // Validation - check if content exists
    if (!content || content.trim() === "") {
      return res.status(400).json({
        message: "Post content is required",
      });
    }

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check if user owns this post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only edit your own posts",
      });
    }

    // Update the post
    post.content = content.trim();
    await post.save();

    // Send response
    res.json({
      message: "Post updated successfully",
      post: {
        id: post._id,
        content: post.content,
        authorName: post.authorName,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    console.error("Edit post error:", error);
    res.status(500).json({
      message: "Error updating post",
      error: error.message,
    });
  }
});

// DELETE POST ROUTE - Users can only delete their own posts
router.delete("/:postId", authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check if user owns this post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own posts",
      });
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);

    // Send response
    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({
      message: "Error deleting post",
      error: error.message,
    });
  }
});

module.exports = router;
