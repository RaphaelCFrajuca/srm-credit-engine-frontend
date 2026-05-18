import { createContext, useContext } from 'react'

export interface ToastContextValue {
  success: (message: string) => void
  error: (message: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside Providers')
  }

  return context
}
