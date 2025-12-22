import { useState, useCallback, useEffect } from 'react';

export function useResizable(initialSize, onResizeEnd, minSize = { width: 200, height: 100 }) {
  const [size, setSize] = useState(initialSize);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = useCallback((e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  }, [size]);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing) return;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;

    const newWidth = Math.max(minSize.width, resizeStart.width + deltaX);
    const newHeight = Math.max(minSize.height, resizeStart.height + deltaY);

    setSize({ width: newWidth, height: newHeight });
  }, [isResizing, resizeStart, minSize]);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      onResizeEnd?.(size);
    }
  }, [isResizing, size, onResizeEnd]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Update size when initialSize changes (e.g., zoom toggle)
  useEffect(() => {
    setSize(initialSize);
  }, [initialSize.width, initialSize.height]);

  return {
    size,
    isResizing,
    handleMouseDown
  };
}
