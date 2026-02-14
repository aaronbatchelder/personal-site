import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import blog posts - we need to read and parse the file since it uses ES modules
const blogPostsPath = path.join(__dirname, '../src/content/blogPosts.js');
const blogPostsContent = fs.readFileSync(blogPostsPath, 'utf-8');

// Extract the blogPosts array using regex (simple approach for static data)
const blogPostsMatch = blogPostsContent.match(/export const blogPosts = (\[[\s\S]*\]);/);
if (!blogPostsMatch) {
  console.error('Could not parse blogPosts.js');
  process.exit(1);
}

// Use eval to parse the array (safe here since we control the file)
const blogPosts = eval(blogPostsMatch[1]);

const SITE_URL = 'https://aaronbatchelder.com';

// Convert markdown-like content to simple HTML for crawlers
function contentToHTML(content) {
  if (!content) return '';

  let html = content
    // Escape HTML entities
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Convert ALL CAPS lines to h2
    .replace(/^([A-Z][A-Z0-9\s,.'?!()\-]+)$/gm, (match) => {
      if (match.length > 3 && match === match.toUpperCase()) {
        return `</p><h2>${match}</h2><p>`;
      }
      return match;
    })
    // Convert **bold** to <strong>
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Convert *italic* to <em>
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Convert [text](url) to links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Convert numbered lists
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    // Convert bullet points
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Convert blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Convert double newlines to paragraph breaks
    .replace(/\n\n/g, '</p><p>')
    // Convert single newlines to line breaks
    .replace(/\n/g, '<br>');

  // Wrap in paragraph tags
  html = `<p>${html}</p>`;

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '').replace(/<p>\s*<\/p>/g, '');

  // Remove [IMAGE] placeholders
  html = html.replace(/\[IMAGE\]/g, '');

  return html;
}

function generateBlogPageHTML(post) {
  const fullUrl = `${SITE_URL}/blog/${post.id}`;
  const imageUrl = `${SITE_URL}${post.heroImage}`;
  const contentHTML = contentToHTML(post.content);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🖥️</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <title>${post.title} | Aaron Batchelder</title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="${post.description}" />
    <meta name="author" content="Aaron Batchelder" />
    <link rel="canonical" href="${fullUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:title" content="${post.title}" />
    <meta property="og:description" content="${post.description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:site_name" content="Aaron Batchelder" />
    <meta property="article:published_time" content="${post.pubDate}" />
    <meta property="article:author" content="Aaron Batchelder" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${fullUrl}" />
    <meta name="twitter:title" content="${post.title}" />
    <meta name="twitter:description" content="${post.description}" />
    <meta name="twitter:image" content="${imageUrl}" />

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${post.title}",
      "description": "${post.description}",
      "image": "${imageUrl}",
      "datePublished": "${post.pubDate}",
      "author": {
        "@type": "Person",
        "name": "Aaron Batchelder",
        "url": "${SITE_URL}"
      },
      "publisher": {
        "@type": "Person",
        "name": "Aaron Batchelder"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${fullUrl}"
      }
    }
    </script>

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YK7W4KLG1L"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-YK7W4KLG1L');
    </script>

    <!-- Redirect to main app with blog post context -->
    <script>
      // Store the blog post ID so the app can open it
      sessionStorage.setItem('openBlogPost', '${post.id}');
      // Redirect to main app
      window.location.replace('/');
    </script>
    <style>
      body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; line-height: 1.7; color: #222; }
      h1 { font-size: 24px; margin-bottom: 8px; }
      h2 { font-size: 18px; margin-top: 32px; margin-bottom: 12px; border-bottom: 1px solid #ccc; padding-bottom: 6px; }
      p { margin-bottom: 16px; }
      a { color: #0066cc; }
      blockquote { border-left: 3px solid #666; padding-left: 16px; margin: 16px 0; font-style: italic; }
      .meta { color: #666; font-size: 14px; margin-bottom: 24px; }
      article { display: block; }
    </style>
  </head>
  <body>
    <article>
      <header>
        <h1>${post.title}</h1>
        <p class="meta">By Aaron Batchelder &middot; ${post.date}</p>
      </header>
      ${contentHTML}
      <footer>
        <p><a href="/">Visit Aaron Batchelder's site</a> to read more.</p>
      </footer>
    </article>
  </body>
</html>`;
}

// Create the blog directory in dist
const distBlogDir = path.join(__dirname, '../dist/blog');
if (!fs.existsSync(distBlogDir)) {
  fs.mkdirSync(distBlogDir, { recursive: true });
}

// Generate HTML file for each blog post
blogPosts.forEach(post => {
  const postDir = path.join(distBlogDir, post.id);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }

  const html = generateBlogPageHTML(post);
  const filePath = path.join(postDir, 'index.html');
  fs.writeFileSync(filePath, html);
  console.log(`Generated: /blog/${post.id}/index.html`);
});

console.log(`\nGenerated ${blogPosts.length} blog pages with meta tags.`);
