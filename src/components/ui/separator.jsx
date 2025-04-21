
import React from "react"

export function Separator({ className }) {
  return (
    <div 
      className={className} 
      style={{
        height: "1px",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        margin: "8px 0"
      }}
    />
  );
}
