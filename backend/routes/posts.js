const express = require("express");
const Post = require("../models/Post");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({
        message: "Post content is required",
      });
    }

    const post = new Post({
      content: content.trim(),
      author: req.user._id,
      authorName: req.user.name,
    });

    await post.save();

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

router.get("/", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .select("content authorName createdAt author");

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

router.put("/:postId", authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({
        message: "Post content is required",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only edit your own posts",
      });
    }

    post.content = content.trim();
    await post.save();

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

router.delete("/:postId", authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own posts",
      });
    }

    await Post.findByIdAndDelete(postId);

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
