// Navigation bar for HyperCard stack

// Arrow icons
const LeftArrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RightArrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function CardNavigation({
  cardNumber,
  totalCards,
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  onHome,
  onIndex,
}) {
  return (
    <div className="hypercard-nav">
      <div className="hypercard-nav-buttons">
        <button
          className="hypercard-nav-button"
          onClick={onPrev}
          disabled={!canGoPrev}
          title="Previous Card"
        >
          <LeftArrow />
        </button>
        <button
          className="hypercard-nav-button"
          onClick={onNext}
          disabled={!canGoNext}
          title="Next Card"
        >
          <RightArrow />
        </button>
      </div>

      <span className="hypercard-card-counter">
        Card {cardNumber} of {totalCards}
      </span>

      <div className="hypercard-nav-links">
        <button className="hypercard-nav-link" onClick={onHome}>
          Home
        </button>
        <button className="hypercard-nav-link" onClick={onIndex}>
          Index
        </button>
      </div>
    </div>
  );
}
