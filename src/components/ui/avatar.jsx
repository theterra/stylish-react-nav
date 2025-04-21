
import React from "react"

export function Avatar({ src, alt = "", fallback }) {
  return src
    ? <img src={src} alt={alt} style={{
        borderRadius: "50%",
        width: 40, height: 40, objectFit: "cover"
      }} />
    : <span style={{
        borderRadius: "50%", background: "#eee", width: 40, height: 40, display: "inline-flex",
        alignItems: "center", justifyContent: "center", color: "#888"
      }}>{fallback || alt?.slice(0,2).toUpperCase()}</span>
}
