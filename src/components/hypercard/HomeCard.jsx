// Home Card - Welcome screen for the blog
export function HomeCard({ onReadPosts, onLatestPost, hasPosts }) {
  return (
    <div className="home-card">
      <div className="home-card-icon">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stack of cards icon */}
          <rect x="12" y="16" width="44" height="36" fill="#E8E8E8" stroke="#000" strokeWidth="2"/>
          <rect x="8" y="12" width="44" height="36" fill="#F0F0F0" stroke="#000" strokeWidth="2"/>
          <rect x="4" y="8" width="44" height="36" fill="#FFF" stroke="#000" strokeWidth="2"/>
          {/* Card content */}
          <rect x="8" y="12" width="36" height="8" fill="#000"/>
          <rect x="8" y="24" width="28" height="2" fill="#999"/>
          <rect x="8" y="30" width="24" height="2" fill="#999"/>
          <rect x="8" y="36" width="20" height="2" fill="#999"/>
        </svg>
      </div>

      <h1 className="home-card-title">Aaron's Blog</h1>
      <p className="home-card-subtitle">Thoughts on product, building, and life</p>

      {hasPosts ? (
        <div className="home-card-buttons">
          <button className="home-card-button primary" onClick={onLatestPost}>
            Latest Post
          </button>
          <button className="home-card-button" onClick={onReadPosts}>
            All Posts
          </button>
        </div>
      ) : (
        <p className="home-card-subtitle">Coming soon...</p>
      )}
    </div>
  );
}
