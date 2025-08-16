@echo off
echo 🚀 Starting AI Meeting Summarizer...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js and try again.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm and try again.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing root dependencies...
    npm install
)

if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    npm install
    cd ..
)

if not exist "frontend\node_modules" (
    echo 📦 Installing frontend dependencies...
    cd frontend
    npm install
    cd ..
)

REM Check if backend .env file exists
if not exist "backend\.env" (
    echo ⚠️  Backend .env file not found!
    echo Please create backend\.env file with the following variables:
    echo OPENAI_API_KEY=your_openai_api_key
    echo EMAIL_USER=your_email@gmail.com
    echo EMAIL_PASS=your_gmail_app_password
    echo PORT=5000
    echo.
    echo You can copy from backend\config.example.js
    pause
    exit /b 1
)

echo 🌟 All dependencies installed and configuration checked!
echo 🚀 Starting both frontend and backend...
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend will be available at: http://localhost:5000
echo.
echo Press Ctrl+C to stop both servers

REM Start both frontend and backend
npm run dev
