import { Window } from '../Window';
import { HomeCard } from './HomeCard';
import { IndexCard } from './IndexCard';
import { PostCard } from './PostCard';
import { CardNavigation } from './CardNavigation';
import { useHyperCardStack, CARD_TYPES } from '../../hooks/useHyperCardStack';
import { blogPosts } from '../../content/blogPosts';

export function HyperCardWindow({ windowProps }) {
  const {
    currentCard,
    goHome,
    goToIndex,
    goToPost,
    goToNextPost,
    goToPrevPost,
    getCardNumber,
    getTotalCards,
    getCurrentPost,
    canGoNext,
    canGoPrev,
    posts,
  } = useHyperCardStack(blogPosts);

  const renderCard = () => {
    switch (currentCard.type) {
      case CARD_TYPES.HOME:
        return (
          <HomeCard
            onReadPosts={goToIndex}
            onLatestPost={() => goToPost(0)}
            hasPosts={posts.length > 0}
          />
        );

      case CARD_TYPES.INDEX:
        return (
          <IndexCard
            posts={posts}
            onSelectPost={goToPost}
          />
        );

      case CARD_TYPES.POST:
        return <PostCard post={getCurrentPost()} />;

      default:
        return <HomeCard onReadPosts={goToIndex} onLatestPost={() => goToPost(0)} />;
    }
  };

  return (
    <Window
      {...windowProps}
      className="hypercard-window"
      resizable={false}
    >
      <div className="hypercard-stack">
        <div className="hypercard-card">
          {renderCard()}
        </div>

        <CardNavigation
          cardNumber={getCardNumber()}
          totalCards={getTotalCards()}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          onPrev={goToPrevPost}
          onNext={goToNextPost}
          onHome={goHome}
          onIndex={goToIndex}
        />
      </div>
    </Window>
  );
}
