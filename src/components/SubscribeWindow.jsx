import { useState } from 'react';
import { Window } from './Window';

export function SubscribeWindow({ windowProps, onSuccess }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      onSuccess?.(email);
    }
  };

  return (
    <Window {...windowProps} className="form-window">
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h2 style={{ fontFamily: 'var(--font-chicago)', marginBottom: '16px' }}>
            Thanks for subscribing!
          </h2>
          <p style={{ fontFamily: 'var(--font-geneva)' }}>
            You&apos;ll hear from me soon.
          </p>
        </div>
      ) : (
        <form className="mac-form" onSubmit={handleSubmit}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-chicago)', marginBottom: '8px' }}>
              Newsletter
            </h2>
            <p style={{ fontFamily: 'var(--font-geneva)', marginBottom: '16px', fontSize: '12px' }}>
              Get updates on product management, side projects, and occasional cocktail recipes.
            </p>
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <button type="submit" className="mac-button primary">
              Subscribe
            </button>
          </div>
        </form>
      )}
    </Window>
  );
}
