
import React from "react"

export function Sheet({ open, onOpenChange, children }) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={() => onOpenChange(false)}>
      {children}
    </div>
  );
}

export function SheetContent({ children, side = "right", className }) {
  const sideStyles = {
    right: { right: 0, top: 0, bottom: 0 },
    left: { left: 0, top: 0, bottom: 0 },
    top: { top: 0, left: 0, right: 0 },
    bottom: { bottom: 0, left: 0, right: 0 }
  };
  
  return (
    <div 
      className={className}
      style={{
        position: "fixed",
        width: side === "left" || side === "right" ? "300px" : "100%",
        height: side === "top" || side === "bottom" ? "300px" : "100%",
        backgroundColor: "white",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        padding: "1rem",
        overflow: "auto",
        ...sideStyles[side]
      }}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
