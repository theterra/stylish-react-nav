
import React, { useRef, useEffect } from "react"

export function Popover({ open, onClose, children, anchorEl }) {
  const popoverRef = useRef(null);

  useEffect(() => {
    function handler(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose && onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handler);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;
  const style = {
    position: 'absolute',
    top: anchorEl?.getBoundingClientRect().bottom + 8 || 100,
    left: anchorEl?.getBoundingClientRect().left || 50,
    zIndex: 99999,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 4px 20px rgba(0,0,0,0.14)",
    padding: "12px 20px",
    minWidth: 180
  };
  return (
    <div ref={popoverRef} style={style}>
      {children}
    </div>
  );
}
