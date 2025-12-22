import { useState, useCallback, useEffect } from 'react';

export function useDraggable(initialPosition, onDragEnd) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    // Don't drag if clicking on close or zoom boxes
    if (e.target.closest('.window-close-box') || e.target.closest('.window-zoom-box')) {
      return;
    }

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const newX = Math.max(0, e.clientX - dragOffset.x);
    const newY = Math.max(20, e.clientY - dragOffset.y); // Keep below menu bar

    setPosition({ x: newX, y: newY });
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd?.(position);
    }
  }, [isDragging, position, onDragEnd]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Update position when initialPosition changes (e.g., zoom toggle)
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition.x, initialPosition.y]);

  return {
    position,
    isDragging,
    handleMouseDown
  };
}
