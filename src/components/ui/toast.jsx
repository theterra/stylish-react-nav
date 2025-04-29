
import React from "react"
import { cn } from "@/lib/utils"

const ToastProvider = ({ children }) => {
  return (
    <div className="toast-provider">{children}</div>
  )
}

const Toast = ({ className, children, open, onClose, ...props }) => {
  if (!open && !props.forceMount) return null
  
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex max-w-md flex-col gap-2 bg-background p-4 shadow-lg rounded-lg border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const ToastTitle = ({ className, ...props }) => (
  <div
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
)

const ToastDescription = ({ className, ...props }) => (
  <div
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
)

const ToastClose = ({ className, ...props }) => (
  <button
    className={cn(
      "absolute top-2 right-2 rounded-md p-1 text-foreground/50 hover:text-foreground hover:bg-accent",
      className
    )}
    {...props}
  >
    ✕
  </button>
)

const ToastViewport = ({ className, ...props }) => (
  <div
    className={cn("fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className)}
    {...props}
  />
)

export {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport
}
