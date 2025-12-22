import { useState } from 'react';
import { AppleLogo } from './Icons';

const finderMenus = {
  apple: {
    label: <AppleLogo />,
    items: [
      { label: 'About This Website...', action: 'about' },
      { type: 'divider' },
      { label: 'Recent Items', disabled: true },
    ]
  },
  file: {
    label: 'File',
    items: [
      { label: 'New Folder', disabled: true },
      { label: 'Open', shortcut: '⌘O', action: 'open' },
      { label: 'Close Window', shortcut: '⌘W', action: 'close' },
      { type: 'divider' },
      { label: 'Get Info', disabled: true },
    ]
  },
  edit: {
    label: 'Edit',
    items: [
      { label: 'Undo', shortcut: '⌘Z', disabled: true },
      { type: 'divider' },
      { label: 'Cut', shortcut: '⌘X', disabled: true },
      { label: 'Copy', shortcut: '⌘C', disabled: true },
      { label: 'Paste', shortcut: '⌘V', disabled: true },
      { label: 'Select All', shortcut: '⌘A', disabled: true },
    ]
  },
  view: {
    label: 'View',
    items: [
      { label: 'by Icon', checked: true },
      { label: 'by Name' },
      { label: 'by Date' },
    ]
  },
  special: {
    label: 'Special',
    items: [
      { label: 'Empty Trash...', action: 'emptyTrash' },
    ]
  }
};

const gameMenus = {
  apple: finderMenus.apple,
  game: {
    label: 'Game',
    items: [
      { label: 'New Game', shortcut: '⌘N', action: 'newGame' },
      { label: 'Pause', shortcut: '⌘P', action: 'pause' },
      { type: 'divider' },
      { label: 'Quit', shortcut: '⌘Q', action: 'quitGame' },
    ]
  },
  help: {
    label: 'Help',
    items: [
      { label: 'How to Play', action: 'help' },
    ]
  }
};

export function MenuBar({ activeApp = 'Finder', onMenuAction, onShowAbout }) {
  const [openMenu, setOpenMenu] = useState(null);

  const menus = activeApp === 'Brick Breaker' ? gameMenus : finderMenus;

  const handleMenuClick = (menuKey) => {
    setOpenMenu(openMenu === menuKey ? null : menuKey);
  };

  const handleItemClick = (item) => {
    if (item.disabled) return;

    if (item.action === 'about') {
      onShowAbout?.();
    } else if (item.action) {
      onMenuAction?.(item.action);
    }

    setOpenMenu(null);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  return (
    <div className="menu-bar" onMouseLeave={handleMouseLeave}>
      <div className="menu-bar-left">
        {Object.entries(menus).map(([key, menu]) => (
          <div
            key={key}
            className={`menu-item ${key === 'apple' ? 'apple-menu' : ''} ${openMenu === key ? 'active' : ''}`}
            onClick={() => handleMenuClick(key)}
            onMouseEnter={() => openMenu && setOpenMenu(key)}
          >
            {menu.label}
            {openMenu === key && (
              <div className="dropdown-menu">
                {menu.items.map((item, idx) => (
                  item.type === 'divider' ? (
                    <div key={idx} className="dropdown-item divider" />
                  ) : (
                    <div
                      key={idx}
                      className={`dropdown-item ${item.disabled ? 'disabled' : ''} ${item.checked ? 'checked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(item);
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="menu-bar-right">
        <span className="application-name">{activeApp}</span>
      </div>
    </div>
  );
}
