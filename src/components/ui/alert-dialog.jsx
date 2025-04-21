
import React from "react"

export function AlertDialog({ open, onClose, children }) {
  if (!open) return null
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 8,
        maxWidth: 390,
        width: "90vw",
        padding: 24,
        boxShadow: "0 6px 24px 0 rgba(0,0,0,0.12)"
      }}>
        {children}
        <button style={{ marginTop: 20 }} onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
