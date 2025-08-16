import React, { useState } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import './App.css';

// API Base URL for production deployment
const API_BASE_URL = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.railway.app' 
    : ''
);

function App() {
  const [transcript, setTranscript] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipients, setRecipients] = useState('');
  const [emailSubject, setEmailSubject] = useState('Meeting Summary');
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTranscript(e.target.result);
      };
      reader.readAsText(file);
    } else {
      setMessage('Please upload a text file (.txt)');
    }
  };

  const generateSummary = async () => {
    if (!transcript.trim()) {
      setMessage('Please enter or upload a transcript');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/generate-summary`, {
        transcript: transcript.trim(),
        customPrompt: customPrompt.trim()
      });

      setSummary(response.data.summary);
      setMessage('Summary generated successfully!');
    } catch (error) {
      console.error('Error generating summary:', error);
      setMessage('Error generating summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmail = async () => {
    if (!summary.trim()) {
      setMessage('No summary to send');
      return;
    }

    if (!recipients.trim()) {
      setMessage('Please enter recipient email addresses');
      return;
    }

    setIsEmailSending(true);
    setMessage('');

    try {
      const recipientList = recipients.split(',').map(email => email.trim()).filter(email => email);
      
      await axios.post(`${API_BASE_URL}/api/send-email`, {
        recipients: recipientList,
        subject: emailSubject,
        summary: summary
      });

      setMessage('Email sent successfully!');
      setRecipients('');
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('Error sending email. Please try again.');
    } finally {
      setIsEmailSending(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Meeting Notes Summarizer</h1>
        <p>Upload transcripts, generate AI summaries, and share via email</p>
      </header>

      <main className="App-main">
        {/* File Upload Section */}
        <section className="upload-section">
          <h2>1. Upload Transcript</h2>
          <div className="file-upload">
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              id="file-input"
            />
            <label htmlFor="file-input" className="file-label">
              Choose Text File (.txt)
            </label>
          </div>
          <p>Or paste your transcript below:</p>
          <TextareaAutosize
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste your meeting transcript here..."
            className="transcript-input"
            minRows={6}
          />
        </section>

        {/* Custom Prompt Section */}
        <section className="prompt-section">
          <h2>2. Custom Instructions (Optional)</h2>
          <TextareaAutosize
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g., 'Summarize in bullet points for executives' or 'Highlight only action items'"
            className="prompt-input"
            minRows={3}
          />
        </section>

        {/* Generate Summary Section */}
        <section className="generate-section">
          <h2>3. Generate Summary</h2>
          <button 
            onClick={generateSummary} 
            disabled={isLoading || !transcript.trim()}
            className="generate-btn"
          >
            {isLoading ? 'Generating Summary...' : 'Generate Summary'}
          </button>
        </section>

        {/* Summary Display and Edit Section */}
        {summary && (
          <section className="summary-section">
            <h2>4. Generated Summary (Editable)</h2>
            <TextareaAutosize
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="summary-output"
              minRows={8}
            />
          </section>
        )}

        {/* Email Sharing Section */}
        {summary && (
          <section className="email-section">
            <h2>5. Share via Email</h2>
            <div className="email-inputs">
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Email subject"
                className="email-subject"
              />
              <TextareaAutosize
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder="Enter recipient emails (comma-separated): john@example.com, jane@example.com"
                className="email-recipients"
                minRows={2}
              />
              <button 
                onClick={sendEmail} 
                disabled={isEmailSending || !recipients.trim()}
                className="email-btn"
              >
                {isEmailSending ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </section>
        )}

        {/* Message Display */}
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
