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

function generateBlogPageHTML(post) {
  const fullUrl = `${SITE_URL}/blog/${post.id}`;
  const imageUrl = `${SITE_URL}${post.heroImage}`;

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
  </head>
  <body>
    <noscript>
      <meta http-equiv="refresh" content="0;url=/" />
      <p>Redirecting to <a href="/">Aaron Batchelder's site</a>...</p>
    </noscript>
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
