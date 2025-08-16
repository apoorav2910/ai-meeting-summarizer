# Deployment Guide for AI Meeting Summarizer

This guide provides step-by-step instructions for deploying the AI Meeting Summarizer application to production.

## 🚀 Quick Deployment Steps

### Option 1: Railway (Backend) + Vercel (Frontend) - RECOMMENDED

#### Backend Deployment on Railway

1. **Create Railway Account**
   - Go to [Railway](https://railway.app/)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Navigate to backend directory
   cd backend
   
   # Initialize Railway project
   railway init
   
   # Deploy
   railway up
   ```

3. **Set Environment Variables in Railway Dashboard**
   - Go to your Railway project dashboard
   - Navigate to Variables tab
   - Add these variables:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_gmail_app_password
     PORT=5000
     ```

4. **Note Your Backend URL**
   - Railway will provide a URL like: `https://your-project.railway.app`

#### Frontend Deployment on Vercel

1. **Update Frontend for Production**
   ```bash
   cd frontend/src
   ```
   
   Edit `App.js` to use environment variable for API URL:
   ```javascript
   // Add this at the top of App.js
   const API_BASE_URL = process.env.REACT_APP_API_URL || '';
   
   // Update axios calls
   const response = await axios.post(`${API_BASE_URL}/api/generate-summary`, {
     transcript: transcript.trim(),
     customPrompt: customPrompt.trim()
   });
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Navigate to frontend directory
   cd frontend
   
   # Deploy
   vercel
   ```

3. **Set Environment Variables in Vercel**
   - Go to Vercel dashboard
   - Navigate to your project settings
   - Add Environment Variable:
     ```
     REACT_APP_API_URL=https://your-railway-backend-url.railway.app
     ```

4. **Redeploy Frontend**
   ```bash
   vercel --prod
   ```

### Option 2: Heroku (Backend) + Netlify (Frontend)

#### Backend on Heroku

1. **Create Heroku App**
   ```bash
   # Install Heroku CLI
   # Create app
   heroku create your-app-name
   
   # Navigate to backend
   cd backend
   
   # Deploy
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a your-app-name
   git push heroku main
   ```

2. **Set Heroku Environment Variables**
   ```bash
   heroku config:set OPENAI_API_KEY=your_key
   heroku config:set EMAIL_USER=your_email
   heroku config:set EMAIL_PASS=your_password
   ```

#### Frontend on Netlify

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `build` folder
   - Or connect GitHub repository

3. **Set Environment Variables**
   - In Netlify dashboard, go to Site settings > Environment variables
   - Add: `REACT_APP_API_URL=https://your-heroku-app.herokuapp.com`

## 🔧 Production Configuration

### Backend Production Updates

Update `backend/server.js` for production:

```javascript
// Add at the top
const PORT = process.env.PORT || 5000;

// Update CORS for production
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### Frontend Production Updates

Update `frontend/src/App.js`:

```javascript
// At the top of App.js
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// Update all API calls
const generateSummary = async () => {
  // ... existing code ...
  const response = await axios.post(`${API_BASE_URL}/api/generate-summary`, {
    transcript: transcript.trim(),
    customPrompt: customPrompt.trim()
  });
  // ... rest of the function
};

const sendEmail = async () => {
  // ... existing code ...
  const response = await axios.post(`${API_BASE_URL}/api/send-email`, {
    recipients: recipientList,
    subject: emailSubject,
    summary: summary
  });
  // ... rest of the function
};
```

## 🌍 Environment Variables Reference

### Backend (.env file or deployment platform)
```env
OPENAI_API_KEY=sk-your-openai-key-here
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (deployment platform only)
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

## 🔒 Security for Production

1. **Environment Variables**
   - Never commit .env files
   - Use platform-specific environment variable systems
   - Rotate API keys regularly

2. **CORS Configuration**
   - Set specific frontend URL in CORS origin
   - Don't use wildcards (*) in production

3. **Rate Limiting** (Recommended)
   ```javascript
   const rateLimit = require("express-rate-limit");
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

## 🧪 Testing Production Deployment

### Pre-deployment Checklist

- [ ] Backend starts without errors
- [ ] All environment variables are set
- [ ] OpenAI API key is valid and has credits
- [ ] Gmail app password is working
- [ ] Frontend builds successfully
- [ ] API calls use production URLs

### Post-deployment Testing

1. **Test File Upload**
   - Upload a .txt file
   - Verify text appears in textarea

2. **Test Summary Generation**
   - Generate summary without custom prompt
   - Generate summary with custom prompt
   - Verify AI responses are working

3. **Test Email Functionality**
   - Send email to test address
   - Verify email delivery
   - Test multiple recipients

4. **Test Error Handling**
   - Test with invalid API key
   - Test with wrong email credentials
   - Verify graceful error messages

## 🐛 Troubleshooting Production Issues

### Common Deployment Problems

1. **"Application Error" on Backend**
   - Check logs: `heroku logs --tail` or Railway logs
   - Verify all environment variables are set
   - Check for typos in variable names

2. **Frontend Can't Connect to Backend**
   - Verify REACT_APP_API_URL is set correctly
   - Check CORS configuration
   - Ensure backend is running

3. **OpenAI API Errors**
   - Verify API key is correct
   - Check API usage limits
   - Ensure billing is set up

4. **Email Not Sending**
   - Verify Gmail app password (not regular password)
   - Check 2-factor authentication is enabled
   - Test email credentials locally first

### Debug Commands

```bash
# Check Heroku logs
heroku logs --tail -a your-app-name

# Check Railway logs
railway logs

# Test backend locally with production variables
cd backend
npm start

# Test frontend build locally
cd frontend
npm run build
npx serve -s build
```

## 📊 Monitoring Production

### Recommended Monitoring

1. **Uptime Monitoring**
   - Use UptimeRobot or similar service
   - Monitor both frontend and backend URLs

2. **Error Tracking**
   - Implement Sentry for error tracking
   - Monitor API response times

3. **Usage Analytics**
   - Google Analytics for frontend
   - API usage tracking for backend

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy Backend to Railway
      run: |
        # Add Railway deployment commands
        
    - name: Deploy Frontend to Vercel
      run: |
        # Add Vercel deployment commands
```

## 📞 Support

If you encounter issues during deployment:

1. Check the troubleshooting section above
2. Review platform-specific documentation
3. Check environment variable spelling and values
4. Test components locally before deploying

---

**Remember**: Always test your deployment thoroughly before sharing the live URL!
