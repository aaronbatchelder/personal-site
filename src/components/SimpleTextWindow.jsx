import { Window } from './Window';

// Convert URLs and emails in text to clickable links
function linkify(text) {
  // Regex for URLs and emails
  const urlRegex = /(https?:\/\/[^\s]+|(?:linkedin\.com|github\.com)[^\s]*)/gi;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  // Combined regex to find both URLs and emails
  const combinedRegex = /(https?:\/\/[^\s]+|(?:linkedin\.com|github\.com)[^\s]*|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;

  while ((match = combinedRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const matchedText = match[0];
    const isEmail = matchedText.includes('@');

    if (isEmail) {
      parts.push(
        <a
          key={match.index}
          href={`mailto:${matchedText}`}
          className="simpletext-link"
          onClick={(e) => e.stopPropagation()}
        >
          {matchedText}
        </a>
      );
    } else {
      const href = matchedText.startsWith('http') ? matchedText : `https://${matchedText}`;
      parts.push(
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="simpletext-link"
          onClick={(e) => e.stopPropagation()}
        >
          {matchedText}
        </a>
      );
    }

    lastIndex = match.index + matchedText.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function SimpleTextWindow({ windowProps, document }) {
  return (
    <Window {...windowProps} className="simpletext-window">
      <div className="simpletext-content">
        <h1>{document.title}</h1>
        {document.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{linkify(paragraph)}</p>
        ))}
      </div>
    </Window>
  );
}
