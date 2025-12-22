// Index Card - List of all blog posts
export function IndexCard({ posts, onSelectPost }) {
  return (
    <div className="index-card">
      <div className="index-card-header">
        <h2 className="index-card-title">All Posts</h2>
      </div>

      <div className="index-card-list">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="index-card-item"
            onClick={() => onSelectPost(index)}
          >
            <span className="index-card-item-title">{post.title}</span>
            <span className="index-card-item-date">{post.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
