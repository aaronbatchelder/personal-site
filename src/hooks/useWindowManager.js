import { useState, useCallback } from 'react';

let windowIdCounter = 1;

export function useWindowManager() {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);

  const openWindow = useCallback((windowConfig) => {
    const id = `window-${windowIdCounter++}`;

    setWindows(prev => {
      const existingCount = prev.length;
      const maxZ = prev.length > 0 ? Math.max(...prev.map(w => w.zIndex)) : 0;

      const newWindow = {
        id,
        type: windowConfig.type || 'finder',
        title: windowConfig.title || 'Untitled',
        position: windowConfig.position || {
          x: 100 + (existingCount * 30),
          y: 50 + (existingCount * 30)
        },
        size: windowConfig.size || { width: 400, height: 300 },
        isShaded: false,
        isZoomed: false,
        zIndex: maxZ + 1,
        content: windowConfig.content || null,
        folderId: windowConfig.folderId || null,
        initialPostId: windowConfig.initialPostId || null,
      };

      return [...prev, newWindow];
    });

    setActiveWindowId(id);

    return id;
  }, []);

  const closeWindow = useCallback((windowId) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));

    setActiveWindowId(prev => {
      if (prev === windowId) {
        const remaining = windows.filter(w => w.id !== windowId);
        if (remaining.length > 0) {
          // Find window with highest zIndex
          const topWindow = remaining.reduce((a, b) => a.zIndex > b.zIndex ? a : b);
          return topWindow.id;
        }
        return null;
      }
      return prev;
    });
  }, [windows]);

  const focusWindow = useCallback((windowId) => {
    setActiveWindowId(windowId);
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      return prev.map(w =>
        w.id === windowId ? { ...w, zIndex: maxZ + 1 } : w
      );
    });
  }, []);

  const updateWindowPosition = useCallback((windowId, position) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId ? { ...w, position } : w
    ));
  }, []);

  const updateWindowSize = useCallback((windowId, size) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId ? { ...w, size } : w
    ));
  }, []);

  const toggleShade = useCallback((windowId) => {
    setWindows(prev => prev.map(w =>
      w.id === windowId ? { ...w, isShaded: !w.isShaded } : w
    ));
  }, []);

  const toggleZoom = useCallback((windowId) => {
    setWindows(prev => prev.map(w => {
      if (w.id !== windowId) return w;

      if (w.isZoomed) {
        return {
          ...w,
          isZoomed: false,
          size: w.previousSize || { width: 400, height: 300 },
          position: w.previousPosition || { x: 100, y: 50 }
        };
      } else {
        return {
          ...w,
          isZoomed: true,
          previousSize: w.size,
          previousPosition: w.position,
          size: { width: window.innerWidth - 40, height: window.innerHeight - 60 },
          position: { x: 20, y: 30 }
        };
      }
    }));
  }, []);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    toggleShade,
    toggleZoom,
  };
}
