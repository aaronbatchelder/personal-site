import { useState, useEffect } from 'react';
import { marked } from 'marked';
import { Window } from './Window';
import { blogPosts } from '../content/blogPosts';

// Configure marked for security
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Update URL hash for deep linking without triggering navigation
function updateUrlHash(postId) {
  const newHash = postId ? `#blog/${postId}` : '#blog';
  if (window.location.hash !== newHash) {
    window.history.replaceState(null, '', newHash);
  }
}

// Copy current URL to clipboard
function copyShareLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {}).catch(() => {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  });
}

// Process content with images
function processContent(content, images) {
  if (!content) return '';

  let processed = content;
  let imageIndex = 0;

  // Convert ALL CAPS lines (section headers) to markdown h2 headers
  // Match lines that are entirely uppercase letters, numbers, spaces, and basic punctuation
  processed = processed.replace(/^([A-Z][A-Z0-9\s,.'?!-]+)$/gm, (match) => {
    // Only convert if it looks like a header (not a single word sentence)
    if (match.length > 3 && match === match.toUpperCase()) {
      return `## ${match}`;
    }
    return match;
  });

  // Replace [IMAGE] placeholders with actual images
  processed = processed.replace(/\[IMAGE\]/g, () => {
    if (images && images[imageIndex]) {
      const img = images[imageIndex];
      imageIndex++;
      return `<img src="${img.src}" alt="${img.alt || 'Blog image'}" class="blog-reader-image" />`;
    }
    return '';
  });

  // Make links open in new tab
  let html = marked.parse(processed);
  html = html.replace(/<a href="/g, '<a target="_blank" rel="noopener noreferrer" href="');

  return html;
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
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    copyShareLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="blog-reader-content">
        <p>Post not found.</p>
      </div>
    );
  }

  const htmlContent = processContent(post.content, post.images);

  return (
    <div className="blog-reader-post-view">
      <div className="blog-reader-post-header">
        <div className="blog-reader-header-nav">
          <button className="blog-reader-back-btn" onClick={onBack}>
            &larr; All Posts
          </button>
          <button className="blog-reader-share-btn" onClick={handleShare}>
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>
        <div className="blog-reader-post-meta">
          <h1 className="blog-reader-post-title-large">{post.title}</h1>
          <span className="blog-reader-post-date-large">{post.date}</span>
        </div>
      </div>
      <div
        className="blog-reader-post-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
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
    const post = blogPosts[index];
    if (post) {
      updateUrlHash(post.id);
    }
  };

  const handleBack = () => {
    setCurrentView('list');
    updateUrlHash(null);
  };

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
