
import React, { useState } from "react"

export function Tabs({ tabs }) {
  const [idx, setIdx] = useState(0)
  return (
    <div>
      <div style={{ display: "flex", gap: 16, borderBottom: "1.5px solid #e5e5e5" }}>
        {tabs.map((tab, i) =>
          <button key={tab.label}
            style={{
              border: "none", background: "none", fontWeight: idx === i ? "bold" : "400",
              padding: "8px 16px", borderBottom: idx === i ? "2px solid #9b87f5" : "none", color: "#1A1F2C", cursor: "pointer"
            }}
            onClick={() => setIdx(i)}>
            {tab.label}
          </button>
        )}
      </div>
      <div style={{ padding: "16px 4px" }}>
        {tabs[idx].content}
      </div>
    </div>
  )
}
