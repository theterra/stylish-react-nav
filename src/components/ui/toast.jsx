
import React from "react"

export function Toast({ message, open, onClose }) {
  if (!open) return null
  return (
    <div style={{
      position: "fixed", bottom: 32, right: 20, background: "#1A1F2C", color: "#fff", borderRadius: 8, padding: "14px 32px",
      boxShadow: "0 3px 12px #2226", zIndex: 111111, fontSize: 16
    }}>
      {message}
      <button style={{ marginLeft: 16, background: "none", border: "none", color: "#fff", fontWeight: "bold", cursor: "pointer" }} onClick={onClose}>X</button>
    </div>
  )
}
