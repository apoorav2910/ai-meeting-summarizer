# 🚀 GitHub Deployment Guide - AI Meeting Summarizer

Complete step-by-step guide to deploy your AI Meeting Summarizer using GitHub, Railway (backend), and Vercel (frontend).

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Working local application
- ✅ Groq API key
- ✅ Gmail app password

## 🔄 Step 1: Create GitHub Repository

### Option A: Using GitHub Website
1. Go to [GitHub.com](https://github.com)
2. Click **"New repository"**
3. Repository name: `ai-meeting-summarizer`
4. Description: `AI-powered meeting notes summarizer and sharer`
5. Make it **Public** (required for free deployments)
6. **DON'T** initialize with README (we have files already)
7. Click **"Create repository"**

### Option B: Using GitHub CLI (if installed)
```bash
gh repo create ai-meeting-summarizer --public --description "AI-powered meeting notes summarizer"
```

## 📤 Step 2: Push Your Code to GitHub

### Initialize Git and Push
```bash
# Navigate to your project directory
cd "C:\APOORAV FILES\MangoDesk Assign"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit: AI Meeting Summarizer with Groq integration"

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ai-meeting-summarizer.git

# Push to GitHub
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username!

## ⚡ Step 3: Deploy Backend to Railway

### 3.1 Set Up Railway Account
1. Go to [Railway.app](https://railway.app/)
2. Click **"Login"** → **"Login with GitHub"**
3. Authorize Railway to access your GitHub

### 3.2 Deploy Backend
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `ai-meeting-summarizer` repository
4. Railway will auto-detect Node.js project
5. Click **"Deploy"**

### 3.3 Configure Environment Variables
1. In Railway dashboard, go to your project
2. Click **"Variables"** tab
3. Add these environment variables:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   PORT=5000
   NODE_ENV=production
   ```

### 3.4 Get Your Backend URL
1. After deployment, Railway will provide a URL like:
   `https://ai-meeting-summarizer-production-xxxx.up.railway.app`
2. **Copy this URL** - you'll need it for frontend!

### 3.5 Test Backend
Visit: `https://your-railway-url.railway.app/api/health`
Should return: `{"message":"Server is running!"}`

## 🌐 Step 4: Deploy Frontend to Vercel

### 4.1 Set Up Vercel Account
1. Go to [Vercel.com](https://vercel.com/)
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub

### 4.2 Deploy Frontend
1. Click **"New Project"**
2. Import your `ai-meeting-summarizer` repository
3. **Framework Preset**: React
4. **Root Directory**: `frontend`
5. **Build Command**: `npm run build`
6. **Output Directory**: `build`

### 4.3 Configure Environment Variables
1. In Vercel dashboard, go to **"Settings"** → **"Environment Variables"**
2. Add this variable:
   ```
   REACT_APP_API_URL=https://your-railway-backend-url.railway.app
   ```
   (Use the URL you got from Railway in Step 3.4)

### 4.4 Redeploy
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** to apply environment variables

### 4.5 Get Your Frontend URL
Vercel will provide a URL like:
`https://ai-meeting-summarizer-frontend.vercel.app`

## ✅ Step 5: Final Configuration

### Update Frontend Code (if needed)
If you need to update the backend URL in code:

```javascript
// In frontend/src/App.js
const API_BASE_URL = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? 'https://your-actual-railway-url.railway.app' 
    : ''
);
```

Push changes:
```bash
git add .
git commit -m "Update production API URL"
git push
```

Both platforms will auto-redeploy!

## 🧪 Step 6: Test Your Deployed Application

### Test Complete Workflow
1. **Visit your Vercel URL**: `https://your-app.vercel.app`

2. **Upload Sample Transcript**:
   - Use your sample-transcript.txt content
   - Or paste any meeting notes

3. **Test AI Summarization**:
   - Try custom prompt: "Create executive bullet points"
   - Click "Generate Summary"
   - Should get intelligent Groq AI response

4. **Test Email Sharing**:
   - Enter your email address
   - Click "Send Email"
   - Check your inbox!

## 📋 Your Final Deployed URLs

### Production URLs:
- **Frontend (Main App)**: `https://your-app.vercel.app`
- **Backend API**: `https://your-backend.railway.app`
- **Health Check**: `https://your-backend.railway.app/api/health`

## 🔧 Troubleshooting

### Common Issues:

**1. "Failed to generate summary"**
- Check Railway environment variables
- Verify Groq API key is correct
- Check Railway logs for errors

**2. "Network Error" in frontend**
- Verify REACT_APP_API_URL is set correctly
- Check if backend URL is accessible
- Ensure no CORS issues

**3. "Email not sending"**
- Verify EMAIL_USER and EMAIL_PASS in Railway
- Test Gmail app password
- Check spam folder

### Check Logs:
- **Railway**: Dashboard → Deployments → View Logs
- **Vercel**: Dashboard → Functions → View Logs

## 🎯 Success Checklist

- ✅ Code pushed to GitHub
- ✅ Backend deployed to Railway
- ✅ Frontend deployed to Vercel
- ✅ Environment variables configured
- ✅ AI summarization working
- ✅ Email sharing functional
- ✅ Both URLs accessible publicly

## 🚀 Your Deployed Application

**🎉 Congratulations!** Your AI Meeting Summarizer is now live!

**Share your deployed link**: `https://your-app.vercel.app`

### Features Live in Production:
- ✅ AI-powered meeting summarization (Groq)
- ✅ Custom prompt instructions
- ✅ File upload capability
- ✅ Editable summaries
- ✅ Email sharing functionality
- ✅ Professional UI/UX

**This is your working deployed link for the MangoDesk assignment!** 🚀✨
