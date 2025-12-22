import { FolderIcon, HardDriveIcon, TrashIcon, MailIcon, HyperCardIcon } from './Icons';

export function DesktopIcon({ item, isSelected, onClick, onDoubleClick, variant }) {
  const getIcon = () => {
    if (variant === 'hard-drive') return <HardDriveIcon />;
    if (variant === 'trash') return <TrashIcon empty={true} />;
    if (variant === 'mail') return <MailIcon />;
    if (variant === 'blog') return <HyperCardIcon />;
    return <FolderIcon />;
  };

  const getLabel = () => {
    if (variant === 'hard-drive') return 'Macintosh HD';
    if (variant === 'trash') return 'Trash';
    if (variant === 'mail') return 'Contact Me';
    if (variant === 'blog') return 'Blog';
    return item?.name;
  };

  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="icon-image">
        {getIcon()}
      </div>
      <div className="icon-label">
        {getLabel()}
      </div>
    </div>
  );
}
