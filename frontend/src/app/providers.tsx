import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { useMemo, useState } from 'react'
import { ToastContext, type ToastContextValue } from './toast-context'

interface ToastItem {
  id: string
  type: 'success' | 'error'
  message: string
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
    },
    mutations: {
      retry: false,
    },
  },
})

const Toasts = ({ items }: { items: ToastItem[] }) => (
  <div className="fixed bottom-4 right-4 z-50 space-y-2">
    {items.map((toast) => (
      <div
        key={toast.id}
        className={`rounded-md px-4 py-2 text-sm text-white shadow ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}
      >
        {toast.message}
      </div>
    ))}
  </div>
)

export const Providers = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const pushToast = (type: ToastItem['type'], message: string) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, type, message }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 4000)
  }

  const value = useMemo<ToastContextValue>(
    () => ({
      success: (message) => pushToast('success', message),
      error: (message) => pushToast('error', message),
    }),
    [],
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContext.Provider value={value}>
        {children}
        <Toasts items={toasts} />
      </ToastContext.Provider>
    </QueryClientProvider>
  )
}
