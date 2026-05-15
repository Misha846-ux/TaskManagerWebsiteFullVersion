import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../../Styles/MultiUsedStyles/ActionsMenu.css';

interface ExtraAction {
  label: string;
  action: (id: string | number) => void;
}

interface ActionsMenuProps {
  entityId: string | number;
  onDelete?: (id: string | number) => void;
  onUpdate?: (id: string | number) => void;
  onManageMembers?: (id: string | number) => void;
  extraActions?: ExtraAction[];
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({
  entityId,
  onDelete,
  onUpdate,
  onManageMembers,
  extraActions = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [portalStyle, setPortalStyle] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
    if (wrapperRef.current) {
      const r = wrapperRef.current.getBoundingClientRect();
      setPortalStyle({ top: r.bottom + window.scrollY, left: r.left + window.scrollX });
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClick = (
    e: React.MouseEvent,
    callback?: (id: string | number) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    callback?.(entityId);
    setIsOpen(false);
  };

  const menuContent = (
    <div
      className="actions-menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="menu"
    >
      {onUpdate && (
        <button className="actions-menu-item" onClick={(e) => handleClick(e, onUpdate)}>
          Update
        </button>
      )}

      {onDelete && (
        <button className="actions-menu-item" onClick={(e) => handleClick(e, onDelete)}>
          Delete
        </button>
      )}

      {onManageMembers && (
        <button className="actions-menu-item" onClick={(e) => handleClick(e, onManageMembers)}>
          Manage members
        </button>
      )}

      {extraActions.map((item, i) => (
        <button key={i} className="actions-menu-item" onClick={(e) => handleClick(e, item.action)}>
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <div
      className="actions-menu-wrapper"
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="actions-menu-button" type="button">
        ⋯
      </button>

      {isOpen && portalStyle
        ? createPortal(
            <div
              className="actions-menu-portal"
              style={{ position: 'absolute', top: portalStyle.top, left: portalStyle.left, zIndex: 10000 }}
            >
              {menuContent}
            </div>,
            document.body
          )
        : null}
    </div>
  );
};

export default ActionsMenu;