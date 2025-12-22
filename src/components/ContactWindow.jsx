import { useState } from 'react';
import { Window } from './Window';

export function ContactWindow({ windowProps, onSend }) {
  const [fromEmail, setFromEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (fromEmail && message) {
      // In a real app, this would send the email
      // For now, we'll just show a success state
      onSend?.(fromEmail, message);
      setSent(true);
    }
  };

  return (
    <Window {...windowProps} className="contact-window">
      {sent ? (
        <div className="contact-sent">
          <div className="contact-sent-icon">✉️</div>
          <div className="contact-sent-title">Message Sent!</div>
          <div className="contact-sent-message">
            Thanks for reaching out. I'll get back to you soon.
          </div>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSend}>
          <div className="contact-field">
            <label className="contact-label">To:</label>
            <div className="contact-static">aaronmb7@gmail.com</div>
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="from-email">From:</label>
            <input
              type="email"
              id="from-email"
              className="contact-input"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="subject">Subject:</label>
            <div className="contact-static">Hello from your website!</div>
          </div>

          <div className="contact-field contact-field-message">
            <label className="contact-label" htmlFor="message">Message:</label>
            <textarea
              id="message"
              className="contact-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              required
            />
          </div>

          <div className="contact-actions">
            <button type="submit" className="mac-button primary">
              Send
            </button>
          </div>
        </form>
      )}
    </Window>
  );
}
