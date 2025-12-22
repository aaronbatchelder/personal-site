// Post Card - Individual blog post display
export function PostCard({ post }) {
  if (!post) {
    return (
      <div className="post-card">
        <div className="post-card-header">
          <h2 className="post-card-title">Post Not Found</h2>
        </div>
        <div className="post-card-content">
          <p>This post could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-card">
      <div className="post-card-header">
        <h2 className="post-card-title">{post.title}</h2>
        <p className="post-card-date">{post.date}</p>
      </div>

      <div className="post-card-content">
        {post.content}
      </div>
    </div>
  );
}
