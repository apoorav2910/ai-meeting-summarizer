#!/bin/bash

echo "🚀 Starting AI Meeting Summarizer..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

# Check if backend .env file exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found!"
    echo "Please create backend/.env file with the following variables:"
    echo "OPENAI_API_KEY=your_openai_api_key"
    echo "EMAIL_USER=your_email@gmail.com"
    echo "EMAIL_PASS=your_gmail_app_password"
    echo "PORT=5000"
    echo ""
    echo "You can copy from backend/config.example.js"
    exit 1
fi

echo "🌟 All dependencies installed and configuration checked!"
echo "🚀 Starting both frontend and backend..."
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend will be available at: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Start both frontend and backend
npm run dev
