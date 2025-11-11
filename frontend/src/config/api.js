// API configuration for different environments
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend-app.onrender.com" // Replace with your Render backend URL
    : "http://localhost:5000";

export default API_BASE_URL;
