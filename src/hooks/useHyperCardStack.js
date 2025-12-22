import { useState, useCallback } from 'react';

// Card types
export const CARD_TYPES = {
  HOME: 'home',
  INDEX: 'index',
  POST: 'post',
};

export function useHyperCardStack(posts = []) {
  // Current card state
  const [currentCard, setCurrentCard] = useState({
    type: CARD_TYPES.HOME,
    postIndex: null, // Only used when type is POST
  });

  // Navigation history for back functionality
  const [history, setHistory] = useState([]);

  // Navigate to home card
  const goHome = useCallback(() => {
    setHistory(prev => [...prev, currentCard]);
    setCurrentCard({ type: CARD_TYPES.HOME, postIndex: null });
  }, [currentCard]);

  // Navigate to index (list of posts)
  const goToIndex = useCallback(() => {
    setHistory(prev => [...prev, currentCard]);
    setCurrentCard({ type: CARD_TYPES.INDEX, postIndex: null });
  }, [currentCard]);

  // Navigate to a specific post by index
  const goToPost = useCallback((postIndex) => {
    if (postIndex >= 0 && postIndex < posts.length) {
      setHistory(prev => [...prev, currentCard]);
      setCurrentCard({ type: CARD_TYPES.POST, postIndex });
    }
  }, [currentCard, posts.length]);

  // Navigate to next post
  const goToNextPost = useCallback(() => {
    if (currentCard.type === CARD_TYPES.POST && currentCard.postIndex < posts.length - 1) {
      setHistory(prev => [...prev, currentCard]);
      setCurrentCard({ type: CARD_TYPES.POST, postIndex: currentCard.postIndex + 1 });
    }
  }, [currentCard, posts.length]);

  // Navigate to previous post
  const goToPrevPost = useCallback(() => {
    if (currentCard.type === CARD_TYPES.POST && currentCard.postIndex > 0) {
      setHistory(prev => [...prev, currentCard]);
      setCurrentCard({ type: CARD_TYPES.POST, postIndex: currentCard.postIndex - 1 });
    }
  }, [currentCard]);

  // Go back in history
  const goBack = useCallback(() => {
    if (history.length > 0) {
      const previousCard = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentCard(previousCard);
    }
  }, [history]);

  // Get current card number for display (1-indexed)
  const getCardNumber = useCallback(() => {
    switch (currentCard.type) {
      case CARD_TYPES.HOME:
        return 1;
      case CARD_TYPES.INDEX:
        return 2;
      case CARD_TYPES.POST:
        return 3 + currentCard.postIndex;
      default:
        return 1;
    }
  }, [currentCard]);

  // Total cards in the stack
  const getTotalCards = useCallback(() => {
    return 2 + posts.length; // Home + Index + all posts
  }, [posts.length]);

  // Get current post data (if on a post card)
  const getCurrentPost = useCallback(() => {
    if (currentCard.type === CARD_TYPES.POST && currentCard.postIndex !== null) {
      return posts[currentCard.postIndex];
    }
    return null;
  }, [currentCard, posts]);

  // Check navigation availability
  const canGoNext = currentCard.type === CARD_TYPES.POST && currentCard.postIndex < posts.length - 1;
  const canGoPrev = currentCard.type === CARD_TYPES.POST && currentCard.postIndex > 0;
  const canGoBack = history.length > 0;

  return {
    currentCard,
    goHome,
    goToIndex,
    goToPost,
    goToNextPost,
    goToPrevPost,
    goBack,
    getCardNumber,
    getTotalCards,
    getCurrentPost,
    canGoNext,
    canGoPrev,
    canGoBack,
    posts,
  };
}
