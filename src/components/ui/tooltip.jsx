
import React, { useState } from "react"

export function Tooltip({ children, text }) {
  const [show, setShow] = useState(false)
  return (
    <span style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span style={{
          position: "absolute",
          bottom: "120%",
          background: "#222",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: 4,
          fontSize: 13,
          zIndex: 99999,
          whiteSpace: 'nowrap'
        }}>
          {text}
        </span>
      )}
    </span>
  )
}

export function TooltipProvider({ children }) {
  // This is a simple wrapper that allows for future context if needed
  return <>{children}</>
}
