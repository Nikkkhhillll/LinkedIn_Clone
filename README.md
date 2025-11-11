# LinkedIn Clone - Simple Social Media Website

A beginner-friendly LinkedIn clone built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project demonstrates full-stack development skills including user authentication, post creation, and data management.

## 🌟 Features

- **User Authentication**: Sign up and login with email and password
- **Create Posts**: Share text posts with other users
- **View Feed**: See all posts from all users in chronological order (newest first)
- **Responsive Design**: Works on desktop and mobile devices
- **Secure**: Passwords are hashed and JWT tokens are used for authentication

## 🛠️ Technology Stack

### Backend

- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web framework for building APIs
- **MongoDB**: NoSQL database for storing user and post data
- **Mongoose**: MongoDB object modeling library
- **bcryptjs**: Password hashing library
- **jsonwebtoken**: JWT token generation and verification
- **cors**: Cross-origin resource sharing middleware

### Frontend

- **React.js**: Frontend JavaScript library for building user interfaces
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **CSS3**: Modern styling and responsive design

## 📁 Project Structure

```
LinkedIn_Clone/
├── backend/
│   ├── models/
│   │   ├── User.js          # User database model
│   │   └── Post.js          # Post database model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes (signup/login)
│   │   └── posts.js         # Post routes (create/get posts)
│   ├── middleware/
│   │   └── auth.js          # Authentication middleware
│   ├── package.json         # Backend dependencies
│   ├── server.js            # Main server file
│   └── .env.example         # Environment variables example
├── frontend/
│   ├── public/
│   │   └── index.html       # Main HTML file
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js    # Navigation header component
│   │   │   ├── Login.js     # Login form component
│   │   │   ├── Signup.js    # Signup form component
│   │   │   └── Feed.js      # Posts feed component
│   │   ├── App.js           # Main React app component
│   │   ├── index.js         # React app entry point
│   │   └── index.css        # Global styles
│   └── package.json         # Frontend dependencies
└── README.md                # This file
```

## 🚀 How to Run the Project

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git (for cloning the repository)

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd LinkedIn_Clone
```

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings:
# MONGODB_URI=mongodb://localhost:27017/linkedin-clone (for local MongoDB)
# or your MongoDB Atlas connection string
# JWT_SECRET=your-super-secret-key-here
```

### Step 3: Setup Frontend

```bash
# Open new terminal and navigate to frontend folder
cd frontend

# Install dependencies
npm install
```

### Step 4: Start the Application

```bash
# Terminal 1 - Start Backend (from backend folder)
npm run dev
# Backend will run on http://localhost:5000

# Terminal 2 - Start Frontend (from frontend folder)
npm start
# Frontend will run on http://localhost:3000
```

### Step 5: Test the Application

1. Open your browser and go to `http://localhost:3000`
2. Create a new account using the signup form
3. Login with your credentials
4. Create your first post
5. See your post appear in the feed

## 📱 How the App Works

1. **Landing Page**: Users see a login page when they first visit
2. **Registration**: New users can create an account with name, email, and password
3. **Authentication**: Users login and receive a JWT token for secure access
4. **Dashboard**: Logged-in users see a feed with a post creation form at the top
5. **Create Posts**: Users can write and share text posts
6. **View Feed**: All posts from all users are displayed in chronological order
7. **Logout**: Users can logout, which clears their session

## 🔐 Security Features

- **Password Hashing**: User passwords are encrypted using bcrypt before storing in database
- **JWT Tokens**: Secure authentication tokens with expiration dates
- **Protected Routes**: API endpoints require valid authentication
- **Input Validation**: Form inputs are validated on both frontend and backend

## 🎨 Code Explanation (For Beginners)

### Backend Structure

**server.js**: The main server file that:

- Sets up Express server
- Connects to MongoDB database
- Defines middleware for JSON parsing and CORS
- Sets up API routes for authentication and posts

**Models**: Define the structure of data in MongoDB

- `User.js`: Defines user schema (name, email, password)
- `Post.js`: Defines post schema (content, author, timestamp)

**Routes**: Handle API endpoints

- `auth.js`: Handles signup and login requests
- `posts.js`: Handles creating and fetching posts

**Middleware**: Functions that run before route handlers

- `auth.js`: Verifies JWT tokens to protect routes

### Frontend Structure

**App.js**: Main component that:

- Manages global authentication state
- Sets up routing between pages
- Handles login/logout functionality

**Components**: Individual UI pieces

- `Header.js`: Navigation bar with user info and logout
- `Login.js`: Login form with email and password
- `Signup.js`: Registration form with name, email, and password
- `Feed.js`: Displays posts and post creation form

## 🚀 Deployment Instructions

### Frontend Deployment (Netlify/Vercel)

1. Build the React app: `npm run build`
2. Deploy the `build` folder to Netlify or Vercel
3. Update API URLs to point to your deployed backend

### Backend Deployment (Render/Railway)

1. Create account on Render or Railway
2. Connect your GitHub repository
3. Set environment variables (MONGODB_URI, JWT_SECRET)
4. Deploy the backend folder

## 🔧 Environment Variables

Create a `.env` file in the backend folder with:

```
MONGODB_URI=mongodb://localhost:27017/linkedin-clone
JWT_SECRET=your-super-secret-key-here
PORT=5000
```

For production, use:

- MongoDB Atlas connection string for MONGODB_URI
- Strong, random string for JWT_SECRET
- Port provided by hosting service

## 🐛 Troubleshooting

**Common Issues:**

1. **Can't connect to MongoDB**:

   - Make sure MongoDB is running locally OR
   - Use correct MongoDB Atlas connection string

2. **CORS errors**:

   - Backend has CORS enabled
   - Frontend proxy is set to backend URL

3. **Authentication not working**:

   - Check if JWT_SECRET is set correctly
   - Verify token is being sent in Authorization header

4. **Posts not showing**:
   - Check if backend is running on port 5000
   - Verify database connection is successful

## 📚 Learning Outcomes

By building this project, you'll learn:

1. **Backend Development**:

   - Setting up Express.js server
   - Database modeling with MongoDB and Mongoose
   - API design and RESTful endpoints
   - Authentication with JWT tokens
   - Password hashing and security

2. **Frontend Development**:

   - React components and state management
   - Client-side routing with React Router
   - HTTP requests with Axios
   - Form handling and validation
   - Responsive CSS design

3. **Full-Stack Integration**:
   - Connecting frontend to backend APIs
   - Managing authentication state across components
   - Error handling and loading states
   - Data flow between client and server

## 🎯 Future Enhancements (Optional)

- Add like and comment functionality
- Allow users to edit/delete their own posts
- Create user profile pages
- Add image upload capabilities
- Implement real-time updates with Socket.io
- Add search functionality
- Create user connections/following system

## 📝 License

This project is for educational purposes. Feel free to use and modify as needed.

---

**Built with ❤️ for learning full-stack development**
