// Simple toast - you can replace with a library like react-hot-toast later
import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export function Toaster() {
  // For now, just a placeholder. Add react-hot-toast later if needed.
  return null
}

// Optional: Add toast functionality later
export function useToast() {
  return {
    toast: (message) => console.log('Toast:', message)
  }
}