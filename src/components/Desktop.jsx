import { useState, useCallback, useEffect } from 'react';
import { MenuBar } from './MenuBar';
import { DesktopIcon } from './DesktopIcon';
import { FinderWindow } from './FinderWindow';
import { SimpleTextWindow } from './SimpleTextWindow';
import { PictureWindow } from './PictureWindow';
import { SubscribeWindow } from './SubscribeWindow';
import { GameWindow } from './game/GameWindow';
import { MinesweeperWindow } from './game/MinesweeperWindow';
import { ContactWindow } from './ContactWindow';
import { HyperCardWindow } from './hypercard/HyperCardWindow';
import { AlertDialog } from './AlertDialog';
import { useWindowManager } from '../hooks/useWindowManager';
import { fileSystem } from '../content/fileSystem';

// Aaron's photo
const AARON_PHOTO = '/images/aaron-photo.jpeg';

export function Desktop() {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    toggleShade,
    toggleZoom,
  } = useWindowManager();

  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);
  const [selectedFinderItems, setSelectedFinderItems] = useState({});
  const [showAbout, setShowAbout] = useState(false);
  const [externalLinkAlert, setExternalLinkAlert] = useState(null);
  const [hasShownBio, setHasShownBio] = useState(false);
  const [hasHandledDeepLink, setHasHandledDeepLink] = useState(false);

  // Handle deep links (e.g., #blog or #blog/post-id)
  useEffect(() => {
    if (hasHandledDeepLink) return;

    const hash = window.location.hash;
    if (hash.startsWith('#blog')) {
      const postId = hash.replace('#blog/', '').replace('#blog', '') || null;
      openWindow({
        type: 'hypercard',
        title: "Aaron's Blog",
        size: { width: 550, height: 650 },
        initialPostId: postId || null,
      });
      setHasShownBio(true); // Don't show bio if coming from deep link
      setHasHandledDeepLink(true);
      return;
    }

    setHasHandledDeepLink(true);
  }, [hasHandledDeepLink, openWindow]);

  // Auto-popup bio after 3 seconds (only if no deep link)
  useEffect(() => {
    if (hasShownBio) return;

    const timer = setTimeout(() => {
      const bioDoc = fileSystem.documents.bio;
      openWindow({
        type: 'simpletext',
        title: bioDoc.title,
        content: bioDoc,
        size: { width: 450, height: 400 },
      });
      setHasShownBio(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasShownBio, openWindow]);

  const getActiveApp = useCallback(() => {
    if (!activeWindowId) return 'Finder';
    const activeWindow = windows.find(w => w.id === activeWindowId);
    if (activeWindow?.type === 'game') return 'Brick Breaker';
    if (activeWindow?.type === 'minesweeper') return 'Minesweeper';
    if (activeWindow?.type === 'contact') return 'Mail';
    if (activeWindow?.type === 'simpletext') return 'SimpleText';
    if (activeWindow?.type === 'hypercard') return 'HyperCard';
    return 'Finder';
  }, [activeWindowId, windows]);

  const handleOpenContact = useCallback(() => {
    openWindow({
      type: 'contact',
      title: 'Contact Me',
      size: { width: 400, height: 350 },
    });
  }, [openWindow]);

  const handleOpenBlog = useCallback(() => {
    // Check if blog is already open
    const existingWindow = windows.find(w => w.type === 'hypercard');
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    openWindow({
      type: 'hypercard',
      title: "Aaron's Blog",
      size: { width: 550, height: 650 },
    });
  }, [windows, focusWindow, openWindow]);

  const handleOpenFolder = useCallback((folderId, folderName) => {
    // Check if folder is already open
    const existingWindow = windows.find(w => w.folderId === folderId);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    openWindow({
      type: 'finder',
      title: folderName || fileSystem.folders[folderId]?.name || folderId,
      folderId,
      size: { width: 450, height: 300 },
    });
  }, [windows, focusWindow, openWindow]);

  const handleOpenItem = useCallback((item) => {
    switch (item.type) {
      case 'folder':
      case 'folder-alias':
        handleOpenFolder(item.target || item.id, item.name);
        break;

      case 'document': {
        const doc = fileSystem.documents[item.content];
        if (doc) {
          openWindow({
            type: 'simpletext',
            title: doc.title,
            content: doc,
            size: { width: 400, height: 350 },
          });
        }
        break;
      }

      case 'picture':
        openWindow({
          type: 'picture',
          title: item.name,
          content: { src: AARON_PHOTO, alt: item.name },
          size: { width: 350, height: 400 },
        });
        break;

      case 'download': {
        const link = document.createElement('a');
        link.href = item.url;
        link.download = item.url.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      }

      case 'alias':
        setExternalLinkAlert({
          url: item.url,
          name: item.name,
        });
        break;

      case 'form':
        openWindow({
          type: 'form',
          title: item.name,
          size: { width: 350, height: 280 },
        });
        break;

      case 'game':
        openWindow({
          type: 'game',
          title: 'Brick Breaker',
          size: { width: 516, height: 420 },
        });
        break;

      case 'minesweeper':
        openWindow({
          type: 'minesweeper',
          title: 'Minesweeper',
          size: { width: 250, height: 320 },
        });
        break;

      default:
        console.log('Unknown item type:', item.type);
    }
  }, [handleOpenFolder, openWindow]);

  const handleDesktopClick = useCallback((e) => {
    // Only clear selection if clicking on desktop background
    if (e.target.classList.contains('desktop-area')) {
      setSelectedDesktopIcon(null);
    }
  }, []);

  const handleMenuAction = useCallback((action) => {
    switch (action) {
      case 'close':
        if (activeWindowId) closeWindow(activeWindowId);
        break;
      case 'emptyTrash':
        // Show empty message
        break;
      default:
        console.log('Menu action:', action);
    }
  }, [activeWindowId, closeWindow]);

  const renderWindow = (win) => {
    const windowProps = {
      key: win.id,
      id: win.id,
      title: win.title,
      position: win.position,
      size: win.size,
      zIndex: win.zIndex,
      isActive: win.id === activeWindowId,
      isShaded: win.isShaded,
      onClose: () => closeWindow(win.id),
      onFocus: () => focusWindow(win.id),
      onPositionChange: (pos) => updateWindowPosition(win.id, pos),
      onSizeChange: (size) => updateWindowSize(win.id, size),
      onToggleShade: () => toggleShade(win.id),
      onToggleZoom: () => toggleZoom(win.id),
    };

    switch (win.type) {
      case 'finder':
        return (
          <FinderWindow
            key={win.id}
            windowProps={windowProps}
            folderName={win.title}
            items={fileSystem.folders[win.folderId]?.items || []}
            selectedItemId={selectedFinderItems[win.id]}
            onSelectItem={(itemId) =>
              setSelectedFinderItems(prev => ({ ...prev, [win.id]: itemId }))
            }
            onOpenItem={handleOpenItem}
          />
        );

      case 'simpletext':
        return (
          <SimpleTextWindow
            key={win.id}
            windowProps={windowProps}
            document={win.content}
          />
        );

      case 'picture':
        return (
          <PictureWindow
            key={win.id}
            windowProps={windowProps}
            imageSrc={win.content.src}
            imageAlt={win.content.alt}
          />
        );

      case 'form':
        return (
          <SubscribeWindow
            key={win.id}
            windowProps={windowProps}
          />
        );

      case 'game':
        return (
          <GameWindow
            key={win.id}
            windowProps={windowProps}
          />
        );

      case 'minesweeper':
        return (
          <MinesweeperWindow
            key={win.id}
            windowProps={windowProps}
          />
        );

      case 'contact':
        return (
          <ContactWindow
            key={win.id}
            windowProps={windowProps}
          />
        );

      case 'hypercard':
        return (
          <HyperCardWindow
            key={win.id}
            windowProps={windowProps}
            initialPostId={win.initialPostId}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="desktop">
      <MenuBar
        activeApp={getActiveApp()}
        onMenuAction={handleMenuAction}
        onShowAbout={() => setShowAbout(true)}
      />

      <div className="desktop-area" onClick={handleDesktopClick}>
        {/* Main desktop icons - left side */}
        <div className="desktop-icons">
          {fileSystem.desktop.map((item) => (
            <DesktopIcon
              key={item.id}
              item={item}
              isSelected={selectedDesktopIcon === item.id}
              onClick={() => setSelectedDesktopIcon(item.id)}
              onDoubleClick={() => {
                if (item.type === 'alias') {
                  setExternalLinkAlert({ url: item.url, name: item.name });
                } else {
                  handleOpenFolder(item.id, item.name);
                }
              }}
            />
          ))}
          {/* Contact Me - in the same column */}
          <DesktopIcon
            variant="mail"
            isSelected={selectedDesktopIcon === 'contact'}
            onClick={() => setSelectedDesktopIcon('contact')}
            onDoubleClick={handleOpenContact}
          />
          {/* Blog - HyperCard stack */}
          <DesktopIcon
            variant="blog"
            isSelected={selectedDesktopIcon === 'blog'}
            onClick={() => setSelectedDesktopIcon('blog')}
            onDoubleClick={handleOpenBlog}
          />
        </div>

        {/* Hard Drive - top right */}
        <div className="hard-drive-icon">
          <DesktopIcon
            variant="hard-drive"
            isSelected={selectedDesktopIcon === 'macintosh-hd'}
            onClick={() => setSelectedDesktopIcon('macintosh-hd')}
            onDoubleClick={() => handleOpenFolder('macintosh-hd', 'Macintosh HD')}
          />
        </div>

        {/* Trash - bottom right */}
        <div className="trash-icon">
          <DesktopIcon
            variant="trash"
            isSelected={selectedDesktopIcon === 'trash'}
            onClick={() => setSelectedDesktopIcon('trash')}
            onDoubleClick={() => handleOpenFolder('trash', 'Trash')}
          />
        </div>

        {/* Windows */}
        {windows.map(renderWindow)}
      </div>

      {/* About dialog */}
      {showAbout && (
        <AlertDialog
          icon="🖥️"
          title="About This Website"
          message="A nostalgic personal website inspired by Classic Mac OS System 7. Built with React."
          primaryLabel="OK"
          showSecondary={false}
          onPrimary={() => setShowAbout(false)}
        />
      )}

      {/* External link confirmation */}
      {externalLinkAlert && (
        <AlertDialog
          icon="🌐"
          title="External Link"
          message={`You're about to visit ${externalLinkAlert.name}. This will open in a new tab.`}
          primaryLabel="Continue"
          secondaryLabel="Cancel"
          onPrimary={() => {
            window.open(externalLinkAlert.url, '_blank');
            setExternalLinkAlert(null);
          }}
          onSecondary={() => setExternalLinkAlert(null)}
        />
      )}
    </div>
  );
}
