@echo off
echo 🚀 AI Meeting Summarizer - GitHub Deployment Helper
echo.

echo Step 1: Checking if git is initialized...
if not exist ".git" (
    echo Initializing git repository...
    git init
) else (
    echo ✅ Git already initialized
)

echo.
echo Step 2: Adding all files to git...
git add .

echo.
echo Step 3: Committing changes...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Deploy AI Meeting Summarizer

git commit -m "%commit_msg%"

echo.
echo Step 4: GitHub repository setup
echo Please ensure you have created a GitHub repository named 'ai-meeting-summarizer'
echo Repository URL should be: https://github.com/YOUR_USERNAME/ai-meeting-summarizer.git
echo.

set /p github_url="Enter your GitHub repository URL: "
if not "%github_url%"=="" (
    echo Adding remote origin...
    git remote add origin %github_url% 2>nul || git remote set-url origin %github_url%
    
    echo.
    echo Pushing to GitHub...
    git push -u origin main
    
    echo.
    echo ✅ Code successfully pushed to GitHub!
    echo.
    echo 📋 Next Steps:
    echo 1. Deploy backend to Railway: https://railway.app/
    echo 2. Deploy frontend to Vercel: https://vercel.com/
    echo 3. Follow the detailed guide in GITHUB_DEPLOYMENT.md
    echo.
) else (
    echo Skipping GitHub push. Please set up remote manually.
)

echo.
echo 🎯 Deployment URLs will be:
echo Frontend: https://your-app.vercel.app
echo Backend:  https://your-backend.railway.app
echo.
echo See GITHUB_DEPLOYMENT.md for complete instructions!
pause
