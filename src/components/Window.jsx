import { useDraggable } from '../hooks/useDraggable';
import { useResizable } from '../hooks/useResizable';

export function Window({
  id,
  title,
  position,
  size,
  zIndex,
  isActive,
  isShaded,
  children,
  onClose,
  onFocus,
  onPositionChange,
  onSizeChange,
  onToggleShade,
  onToggleZoom,
  className = '',
  resizable = true,
}) {
  const { position: currentPosition, isDragging, handleMouseDown: handleDragStart } = useDraggable(
    position,
    onPositionChange
  );

  const { size: currentSize, isResizing, handleMouseDown: handleResizeStart } = useResizable(
    size,
    onSizeChange
  );

  return (
    <div
      className={`window ${isActive ? 'active' : ''} ${isShaded ? 'shaded' : ''} ${className}`}
      style={{
        left: currentPosition.x,
        top: currentPosition.y,
        width: isShaded ? currentSize.width : currentSize.width,
        height: isShaded ? 'auto' : currentSize.height,
        zIndex,
      }}
      onClick={onFocus}
    >
      <div
        className="window-title-bar"
        onMouseDown={handleDragStart}
        onDoubleClick={onToggleShade}
      >
        <div className="window-close-box" onClick={(e) => { e.stopPropagation(); onClose?.(); }} />
        <div className="window-title">{title}</div>
        <div className="window-zoom-box" onClick={(e) => { e.stopPropagation(); onToggleZoom?.(); }} />
      </div>

      {!isShaded && (
        <>
          <div className="window-content">
            {children}
          </div>
          {resizable && (
            <div
              className="window-resize-handle"
              onMouseDown={handleResizeStart}
            />
          )}
        </>
      )}
    </div>
  );
}
