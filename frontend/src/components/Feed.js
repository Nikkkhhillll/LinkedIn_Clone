// Feed component - shows posts and allows creating new posts
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

function Feed({ user }) {
  // State for posts and new post form
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [updating, setUpdating] = useState(false);

  // Function to get authentication headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Function to fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/api/posts`,
        getAuthHeaders()
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts when component loads
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to handle creating a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!newPost.trim()) {
      setError("Please write something to post");
      return;
    }

    try {
      setPosting(true);
      setError("");

      // Send new post to backend
      await axios.post(
        `${API_BASE_URL}/api/posts`,
        { content: newPost },
        getAuthHeaders()
      );

      // Clear the input and refresh posts
      setNewPost("");
      await fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post");
    } finally {
      setPosting(false);
    }
  };

  // Function to handle editing a post
  const handleEditPost = async (postId) => {
    if (!editContent.trim()) {
      setError("Please write something to post");
      return;
    }

    try {
      setUpdating(true);
      setError("");

      // Send edit request to backend
      await axios.put(
        `${API_BASE_URL}/api/posts/${postId}`,
        { content: editContent },
        getAuthHeaders()
      );

      // Reset editing state and refresh posts
      setEditingPost(null);
      setEditContent("");
      await fetchPosts();
    } catch (error) {
      console.error("Error editing post:", error);
      setError("Failed to edit post");
    } finally {
      setUpdating(false);
    }
  };

  // Function to handle deleting a post
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setError("");

      // Send delete request to backend
      await axios.delete(
        `${API_BASE_URL}/api/posts/${postId}`,
        getAuthHeaders()
      );

      // Refresh posts
      await fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post");
    }
  };

  // Function to start editing a post
  const startEditing = (post) => {
    setEditingPost(post._id);
    setEditContent(post.content);
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setEditingPost(null);
    setEditContent("");
  };

  // Function to check if current user owns a post
  const isPostOwner = (post) => {
    return user && post.author === user.id;
  };

  // Function to format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " at " +
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  return (
    <div className="container">
      {/* Create new post form */}
      <div className="post-form">
        <form onSubmit={handleCreatePost}>
          <textarea
            className="post-textarea"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind? Share your thoughts..."
            rows={3}
          />
          <div style={{ clearfix: "both", overflow: "hidden" }}>
            <button
              type="submit"
              disabled={posting || !newPost.trim()}
              className="post-btn"
            >
              {posting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>

      {/* Show error message if there is one */}
      {error && <div className="error-message">{error}</div>}

      {/* Loading message */}
      {loading && <div className="loading">Loading posts...</div>}

      {/* Posts feed */}
      <div className="posts-feed">
        {posts.length === 0 && !loading ? (
          <div className="post-card">
            <p style={{ textAlign: "center", color: "#666" }}>
              No posts yet. Be the first to share something!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <div className="post-info">
                  <span className="post-author">{post.authorName}</span>
                  <span className="post-date">
                    {formatDate(post.createdAt)}
                  </span>
                </div>

                {/* Show edit/delete buttons only for post owner */}
                {isPostOwner(post) && (
                  <div className="post-actions">
                    <button
                      onClick={() => startEditing(post)}
                      className="edit-btn"
                      disabled={editingPost === post._id}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Show edit form or post content */}
              {editingPost === post._id ? (
                <div className="edit-form">
                  <textarea
                    className="edit-textarea"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                  />
                  <div className="edit-actions">
                    <button
                      onClick={() => handleEditPost(post._id)}
                      disabled={updating || !editContent.trim()}
                      className="save-btn"
                    >
                      {updating ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancelEditing}
                      disabled={updating}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="post-content">{post.content}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;
