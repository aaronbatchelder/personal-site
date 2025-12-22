export function AlertDialog({
  icon = '⚠️',
  title,
  message,
  primaryLabel = 'OK',
  secondaryLabel = 'Cancel',
  onPrimary,
  onSecondary,
  showSecondary = true,
}) {
  return (
    <div className="alert-overlay" onClick={onSecondary}>
      <div className="alert-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="alert-content">
          <div className="alert-icon">{icon}</div>
          <div className="alert-message">
            {title && <div className="alert-title">{title}</div>}
            <div>{message}</div>
          </div>
        </div>
        <div className="alert-buttons">
          {showSecondary && (
            <button className="alert-button" onClick={onSecondary}>
              {secondaryLabel}
            </button>
          )}
          <button className="alert-button primary" onClick={onPrimary}>
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
