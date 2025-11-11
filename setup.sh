#!/bin/bash

# Setup script for LinkedIn Clone project
# This script will install dependencies for both frontend and backend

echo "🚀 Setting up LinkedIn Clone project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"

# Setup backend
echo "📦 Installing backend dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed!"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📄 Created .env file from template. Please update it with your settings."
fi

# Setup frontend
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed!"

cd ..
echo "🎉 Setup complete!"
echo ""
echo "📖 Next steps:"
echo "1. Update backend/.env with your MongoDB URI and JWT secret"
echo "2. Start backend: cd backend && npm run dev"
echo "3. Start frontend: cd frontend && npm start"
echo "4. Visit http://localhost:3000 in your browser"