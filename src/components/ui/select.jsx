
import React from "react"

export function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      padding: "6px 12px", borderRadius: 5, border: "1px solid #bbb"
    }}>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  )
}
