
import React from "react"

export function ScrollArea({ style, children }) {
  return (
    <div style={{
      overflowY: "auto",
      maxHeight: "100%",
      ...(style || {})
    }}>
      {children}
    </div>
  );
}
