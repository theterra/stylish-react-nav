
import React from "react"

export function Switch({ checked, onChange }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ marginRight: 8 }}
      />
      <span style={{
        display: "inline-block",
        width: 32,
        height: 18,
        background: checked ? "#9b87f5" : "#ddd",
        borderRadius: 10,
        position: "relative",
        transition: "background 0.15s"
      }}>
        <span style={{
          position: "absolute",
          left: checked ? 16 : 2,
          top: 2,
          width: 14,
          height: 14,
          background: "#fff",
          borderRadius: "50%",
          transition: "left 0.17s"
        }} />
      </span>
    </label>
  )
}
