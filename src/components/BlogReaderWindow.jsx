import { useState, useEffect } from 'react';
import { Window } from './Window';
import { blogPosts } from '../content/blogPosts';

// Update URL hash for deep linking without triggering navigation
function updateUrlHash(postId) {
  const newHash = postId ? `#blog/${postId}` : '#blog';
  if (window.location.hash !== newHash) {
    window.history.replaceState(null, '', newHash);
  }
}

// Convert text with URLs and markdown links to HTML with anchor tags
function linkify(text) {
  // First handle markdown-style links [text](url)
  let result = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Then handle bare URLs (but not ones already in href="...")
  result = result.replace(
    /(?<!href=["'])(?<!>)(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Handle Twitter/X handles @username
  result = result.replace(
    /@([a-zA-Z0-9_]+)/g,
    '<a href="https://twitter.com/$1" target="_blank" rel="noopener noreferrer">@$1</a>'
  );

  // Handle domain.com patterns (common domains without http)
  result = result.replace(
    /(?<![@/])(?<![a-zA-Z0-9])((?:probablynotsmart\.ai|github\.com\/[^\s<]+|twitter\.com\/[^\s<]+|linkedin\.com\/[^\s<]+))/gi,
    '<a href="https://$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  return result;
}

// Parse simple markdown-like content into renderable elements
function parseContent(content, images) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  let imageIndex = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (!line.trim()) {
      i++;
      continue;
    }

    // Image placeholder [IMAGE]
    if (line.trim() === '[IMAGE]') {
      if (images && images[imageIndex]) {
        elements.push(
          <img
            key={`img-${i}`}
            src={images[imageIndex].src}
            alt={images[imageIndex].alt || 'Blog image'}
            className="blog-reader-image"
          />
        );
        imageIndex++;
      }
      i++;
      continue;
    }

    // Headers
    if (line.startsWith('THE ') || line.startsWith('WHAT') || line.startsWith('HOW ') || line.startsWith('WHY ') || line.startsWith('MEET ')) {
      // Section headers (all caps phrases)
      elements.push(
        <h2 key={i} className="blog-reader-h2">{line}</h2>
      );
      i++;
      continue;
    }

    // Bullet points
    if (line.startsWith('• ') || line.startsWith('- ')) {
      const listItems = [];
      while (i < lines.length && (lines[i].startsWith('• ') || lines[i].startsWith('- '))) {
        listItems.push(lines[i].replace(/^[•-]\s*/, ''));
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className="blog-reader-list">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: linkify(item) }} />
          ))}
        </ul>
      );
      continue;
    }

    // Numbered lists
    if (/^\d+\.\s/.test(line)) {
      const listItems = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s*/, ''));
        i++;
      }
      elements.push(
        <ol key={`olist-${i}`} className="blog-reader-list">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: linkify(item) }} />
          ))}
        </ol>
      );
      continue;
    }

    // Horizontal rule
    if (line.startsWith('---')) {
      elements.push(<hr key={i} className="blog-reader-hr" />);
      i++;
      continue;
    }

    // Block quotes (lines starting with ")
    if (line.startsWith('"') || line.startsWith('>')) {
      elements.push(
        <blockquote key={i} className="blog-reader-quote">
          {line.replace(/^[">]\s*/, '')}
        </blockquote>
      );
      i++;
      continue;
    }

    // Regular paragraph - collect consecutive non-empty, non-special lines
    let paragraph = line;
    i++;
    while (i < lines.length && lines[i].trim() &&
           !lines[i].startsWith('• ') &&
           !lines[i].startsWith('- ') &&
           !lines[i].startsWith('THE ') &&
           !lines[i].startsWith('WHAT') &&
           !lines[i].startsWith('HOW ') &&
           !lines[i].startsWith('WHY ') &&
           !lines[i].startsWith('MEET ') &&
           !lines[i].startsWith('---') &&
           !lines[i].startsWith('"') &&
           !lines[i].startsWith('[IMAGE]') &&
           !/^\d+\.\s/.test(lines[i])) {
      paragraph += ' ' + lines[i];
      i++;
    }

    // Parse inline formatting and links
    const formattedParagraph = linkify(
      paragraph
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    );

    elements.push(
      <p key={`p-${i}`} className="blog-reader-p" dangerouslySetInnerHTML={{ __html: formattedParagraph }} />
    );
  }

  return elements;
}

function PostList({ posts, onSelectPost, selectedPostId }) {
  return (
    <div className="blog-reader-list-view">
      <div className="blog-reader-list-header">
        <h2>Posts</h2>
      </div>
      <div className="blog-reader-posts">
        {posts.length === 0 ? (
          <p className="blog-reader-empty">No posts yet. Check back soon!</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={post.id}
              className={`blog-reader-post-item ${selectedPostId === post.id ? 'selected' : ''}`}
              onClick={() => onSelectPost(index)}
            >
              <span className="blog-reader-post-title">{post.title}</span>
              <span className="blog-reader-post-date">{post.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function PostView({ post, onBack }) {
  if (!post) {
    return (
      <div className="blog-reader-content">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="blog-reader-post-view">
      <div className="blog-reader-post-header">
        <button className="blog-reader-back-btn" onClick={onBack}>
          &larr; All Posts
        </button>
        <div className="blog-reader-post-meta">
          <h1 className="blog-reader-post-title-large">{post.title}</h1>
          <span className="blog-reader-post-date-large">{post.date}</span>
        </div>
      </div>
      <div className="blog-reader-post-content">
        {parseContent(post.content, post.images)}
      </div>
    </div>
  );
}

export function BlogReaderWindow({ windowProps, initialPostId }) {
  const [currentView, setCurrentView] = useState(initialPostId ? 'post' : 'list');
  const [selectedPostIndex, setSelectedPostIndex] = useState(() => {
    if (initialPostId) {
      const index = blogPosts.findIndex(p => p.id === initialPostId);
      return index >= 0 ? index : 0;
    }
    return 0;
  });

  const handleSelectPost = (index) => {
    setSelectedPostIndex(index);
    setCurrentView('post');
    // Update URL for deep linking
    const post = blogPosts[index];
    if (post) {
      updateUrlHash(post.id);
    }
  };

  const handleBack = () => {
    setCurrentView('list');
    updateUrlHash(null);
  };

  // Set initial URL hash when opening with a post
  useEffect(() => {
    if (currentView === 'post' && blogPosts[selectedPostIndex]) {
      updateUrlHash(blogPosts[selectedPostIndex].id);
    } else if (currentView === 'list') {
      updateUrlHash(null);
    }
  }, []);

  const currentPost = blogPosts[selectedPostIndex];

  return (
    <Window {...windowProps} className="blog-reader-window">
      <div className="blog-reader">
        {currentView === 'list' ? (
          <PostList
            posts={blogPosts}
            onSelectPost={handleSelectPost}
            selectedPostId={currentPost?.id}
          />
        ) : (
          <PostView post={currentPost} onBack={handleBack} />
        )}
      </div>
    </Window>
  );
}
