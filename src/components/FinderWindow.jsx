import { Window } from './Window';
import { FolderIcon, DocumentIcon, PictureIcon, AliasIcon, GameIcon, SubscribeIcon, MinesweeperIcon, SnakeIcon, ProbablyNotSmartIcon, ProtoflowIcon, ProductCaseStudiesIcon } from './Icons';

function FinderItem({ item, isSelected, onClick, onDoubleClick }) {
  const getIcon = () => {
    // Check for project-specific icons first
    if (item.id === 'probablynotsmart') return <ProbablyNotSmartIcon />;
    if (item.id === 'letsprotoflow') return <ProtoflowIcon />;
    if (item.id === 'productcasestudies') return <ProductCaseStudiesIcon />;

    switch (item.type) {
      case 'folder':
      case 'folder-alias':
        return <FolderIcon />;
      case 'document':
        return <DocumentIcon />;
      case 'picture':
        return <PictureIcon />;
      case 'alias':
        return <AliasIcon />;
      case 'game':
        return <GameIcon />;
      case 'minesweeper':
        return <MinesweeperIcon />;
      case 'snake':
        return <SnakeIcon />;
      case 'form':
        return <SubscribeIcon />;
      default:
        return <DocumentIcon />;
    }
  };

  return (
    <div
      className={`finder-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="finder-item-icon">
        {getIcon()}
      </div>
      <div className="finder-item-label">
        {item.name}
      </div>
    </div>
  );
}

export function FinderWindow({
  windowProps,
  folderName,
  items,
  selectedItemId,
  onSelectItem,
  onOpenItem,
}) {
  return (
    <Window {...windowProps} className="finder-window">
      <div className="finder-header">
        <span>{items.length} items</span>
        <span>128K available</span>
      </div>
      <div className="finder-grid">
        {items.map((item) => (
          <FinderItem
            key={item.id}
            item={item}
            isSelected={selectedItemId === item.id}
            onClick={() => onSelectItem(item.id)}
            onDoubleClick={() => onOpenItem(item)}
          />
        ))}
      </div>
    </Window>
  );
}
