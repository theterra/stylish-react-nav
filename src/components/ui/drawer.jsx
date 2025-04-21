
import React from "react"

export function Drawer({ open, onClose, children }) {
  if (!open) return null
  return (
    <div style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, top: 0,
      zIndex: 1001, background: 'rgba(0,0,0,0.55)'
    }}>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, borderTopLeftRadius: 18, borderTopRightRadius: 18,
        background: '#fff',
        minHeight: '35vh',
        boxShadow: '0 -2px 16px rgba(0,0,0,0.09)',
        padding: 24
      }}>
        <button style={{ float: "right", marginBottom: 16 }} onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  )
}
