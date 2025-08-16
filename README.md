# AI-Powered Meeting Notes Summarizer

A full-stack web application that allows users to upload meeting transcripts, generate AI-powered summaries with custom instructions, edit the summaries, and share them via email.

## 🚀 Features

- **Upload Text Transcripts**: Support for .txt file uploads or direct text input
- **Custom AI Instructions**: Specify how you want the summary formatted (e.g., "bullet points for executives", "action items only")
- **AI-Powered Summarization**: Uses OpenAI's GPT-3.5-turbo for intelligent meeting summaries
- **Editable Summaries**: Generated summaries can be edited before sharing
- **Email Sharing**: Send summaries to multiple recipients with custom subject lines
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with functional components and hooks
- **Axios** - HTTP client for API communication
- **React Textarea Autosize** - Auto-resizing text areas for better UX
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **OpenAI API** - AI-powered text summarization
- **Nodemailer** - Email sending functionality
- **CORS** - Cross-origin resource sharing
- **Multer** - File upload handling
- **dotenv** - Environment variable management

### Deployment
- **Frontend**: Vercel (recommended) or Netlify
- **Backend**: Railway, Heroku, or Render
- **Environment**: Production-ready with environment variables

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher) installed
2. **npm** or **yarn** package manager
3. **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/)
4. **Gmail Account** (for email functionality) with App Password enabled

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-meeting-summarizer
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install-deps
```

### 3. Backend Configuration

Create a `.env` file in the `backend` directory:
```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password_here

# Server Configuration
PORT=5000
```

**Important**: 
- Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
- For Gmail, you need to generate an App Password (not your regular password)
- Enable 2-factor authentication on Gmail and generate an App Password

### 4. Running the Application

#### Development Mode (Both Frontend & Backend)
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

#### Running Backend Only
```bash
npm run server
```

#### Running Frontend Only
```bash
npm run client
```

## 🎯 How to Use

1. **Upload Transcript**: 
   - Click "Choose Text File" to upload a .txt file
   - OR paste your meeting transcript directly in the text area

2. **Add Custom Instructions** (Optional):
   - Enter specific instructions like:
     - "Summarize in bullet points for executives"
     - "Highlight only action items and decisions"
     - "Create a brief overview for team leads"

3. **Generate Summary**:
   - Click "Generate Summary" button
   - Wait for AI to process and generate the summary

4. **Edit Summary** (Optional):
   - The generated summary appears in an editable text area
   - Make any necessary changes or corrections

5. **Share via Email**:
   - Enter recipient email addresses (comma-separated)
   - Customize the email subject if needed
   - Click "Send Email" to share the summary

## 🚀 Deployment

### Backend Deployment (Railway - Recommended)

1. **Create Railway Account**: Sign up at [Railway](https://railway.app/)

2. **Deploy from GitHub**:
   - Connect your GitHub repository
   - Select the backend folder as the root
   - Railway will auto-detect the Node.js project

3. **Environment Variables**:
   Add these variables in Railway dashboard:
   ```
   OPENAI_API_KEY=your_openai_api_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   PORT=5000
   ```

4. **Deploy**: Railway will automatically deploy your backend

### Frontend Deployment (Vercel - Recommended)

1. **Create Vercel Account**: Sign up at [Vercel](https://vercel.com/)

2. **Deploy from GitHub**:
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Vercel will auto-detect React and build

3. **Environment Variables**:
   Add your backend API URL:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```

4. **Update Frontend API Calls**:
   In `frontend/src/App.js`, update axios calls to use the environment variable:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || '';
   // Use API_URL + '/api/generate-summary' instead of '/api/generate-summary'
   ```

### Alternative Deployment Options

#### Backend
- **Heroku**: Classic choice with good documentation
- **Render**: Modern alternative to Heroku
- **DigitalOcean App Platform**: Scalable option

#### Frontend
- **Netlify**: Great alternative to Vercel
- **GitHub Pages**: Free option for static sites
- **AWS S3 + CloudFront**: Enterprise-level solution

## 🔐 Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Always use environment variables for sensitive data
3. **CORS**: Backend is configured to allow cross-origin requests
4. **Input Validation**: Backend validates all inputs before processing
5. **Rate Limiting**: Consider adding rate limiting for production use

## 🧪 Testing

### Manual Testing Checklist

1. **File Upload**:
   - ✅ Upload .txt file successfully
   - ✅ Reject non-text files
   - ✅ Handle large files gracefully

2. **Text Input**:
   - ✅ Paste text directly
   - ✅ Handle long transcripts
   - ✅ Validate required fields

3. **AI Summary Generation**:
   - ✅ Generate summary without custom prompt
   - ✅ Generate summary with custom prompt
   - ✅ Handle API errors gracefully

4. **Summary Editing**:
   - ✅ Edit generated summary
   - ✅ Save changes properly
   - ✅ Handle large text editing

5. **Email Functionality**:
   - ✅ Send to single recipient
   - ✅ Send to multiple recipients
   - ✅ Custom subject lines
   - ✅ Handle email errors

## 📝 API Documentation

### Backend Endpoints

#### GET /api/health
Health check endpoint
```json
Response: {"message": "Server is running!"}
```

#### POST /api/generate-summary
Generate AI summary from transcript
```json
Request: {
  "transcript": "string (required)",
  "customPrompt": "string (optional)"
}

Response: {
  "summary": "string"
}
```

#### POST /api/send-email
Send summary via email
```json
Request: {
  "recipients": ["email1", "email2"],
  "subject": "string (optional)",
  "summary": "string (required)"
}

Response: {
  "message": "Emails sent successfully"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **"Error generating summary"**:
   - Check OpenAI API key is valid
   - Ensure you have API credits
   - Verify internet connection

2. **"Error sending email"**:
   - Verify Gmail App Password is correct
   - Check 2-factor authentication is enabled
   - Ensure EMAIL_USER and EMAIL_PASS are set

3. **Frontend can't connect to backend**:
   - Verify backend is running on port 5000
   - Check CORS configuration
   - Ensure proxy is set in package.json

4. **File upload not working**:
   - Only .txt files are supported
   - Check file size limits
   - Verify file reading permissions

## 🚀 Future Enhancements

- **File Format Support**: Add support for .docx, .pdf files
- **Multiple AI Providers**: Support for Groq, Claude, etc.
- **User Authentication**: User accounts and history
- **Template Library**: Pre-built summary templates
- **Export Options**: PDF, Word document export
- **Real-time Collaboration**: Multiple users editing
- **Analytics Dashboard**: Usage statistics
- **Mobile App**: React Native mobile version

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support, please create an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for efficient meeting management**
