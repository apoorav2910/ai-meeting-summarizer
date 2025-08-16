# Quick Start Guide - AI Meeting Summarizer

Get up and running in 5 minutes! 🚀

## 📋 Prerequisites

1. **Node.js** (v14+) - [Download here](https://nodejs.org/)
2. **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)
3. **Gmail Account** with App Password enabled

## 🚀 Local Development Setup

### 1. Install Dependencies
```bash
# Option 1: Use the startup script (Recommended)
# On Windows:
start.bat

# On Mac/Linux:
chmod +x start.sh
./start.sh

# Option 2: Manual installation
npm run install-deps
```

### 2. Configure Environment Variables

Create `backend/.env` file:
```env
OPENAI_API_KEY=sk-your-actual-openai-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5000
```

**⚠️ Important Notes:**
- Use Gmail App Password, NOT your regular password
- Enable 2-Factor Authentication on Gmail first
- Generate App Password in Gmail Settings > Security > 2-step Verification > App passwords

### 3. Start the Application
```bash
npm run dev
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🧪 Test the Application

1. **Upload Sample Transcript**
   - Use the provided `sample-transcript.txt` file
   - Or paste any meeting transcript

2. **Try Custom Prompts**
   - "Summarize in bullet points for executives"
   - "Extract only action items and deadlines"
   - "Create a brief overview for team leads"

3. **Test Email Sharing**
   - Use your own email address for testing
   - Check spam folder if email doesn't arrive

## 🚀 Quick Deployment (Optional)

### Deploy to Railway + Vercel (Free Tier)

1. **Backend (Railway)**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Deploy backend
   cd backend
   railway login
   railway init
   railway up
   
   # Set environment variables in Railway dashboard
   ```

2. **Frontend (Vercel)**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy frontend
   cd frontend
   vercel
   
   # Set REACT_APP_API_URL to your Railway backend URL
   ```

Detailed deployment instructions are in `DEPLOYMENT_GUIDE.md`

## 🆘 Common Issues

### "Error generating summary"
- Check OpenAI API key is valid
- Verify you have API credits
- Check internet connection

### "Error sending email"
- Use Gmail App Password (not regular password)
- Enable 2-Factor Authentication first
- Check EMAIL_USER and EMAIL_PASS in .env

### "Cannot connect to backend"
- Verify backend is running on port 5000
- Check for any error messages in terminal
- Ensure .env file exists in backend folder

### File upload not working
- Only .txt files are supported
- Check file size (max 10MB)
- Try pasting text directly instead

## 📞 Need Help?

1. Check the detailed `README.md`
2. Review `DEPLOYMENT_GUIDE.md` for deployment issues
3. Ensure all environment variables are set correctly
4. Try the sample transcript for testing

## 🎯 Next Steps

Once everything is working:
1. Create your own meeting transcripts
2. Experiment with different custom prompts
3. Deploy to production using the deployment guide
4. Share your deployed link!

---

**Happy summarizing!** 📝✨
