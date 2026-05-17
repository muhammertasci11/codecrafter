'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  message: string
  type?: ToastType
  visible: boolean
  onClose: () => void
  duration?: number
  className?: string
}

const icons: Record<ToastType, string> = {
  success: '✅',
  error: '❌',
  info: '🤖',
  warning: '⚠️',
}

const borders: Record<ToastType, string> = {
  success: 'border-[var(--success)]',
  error: 'border-[var(--danger)]',
  info: 'border-[var(--accent-blue)]',
  warning: 'border-[var(--warning)]',
}

export default function Toast({
  message,
  type = 'info',
  visible,
  onClose,
  duration = 3000,
  className = '',
}: ToastProps) {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed top-4 right-4 z-[60] max-w-sm ${className}`}
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div
            className={`glass rounded-[var(--radius-md)] px-4 py-3 border-l-4 ${borders[type]} shadow-lg flex items-center gap-3`}
          >
            <span className="text-lg shrink-0">{icons[type]}</span>
            <p className="text-sm text-[var(--text-primary)] flex-1">{message}</p>
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm shrink-0"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function useToastState() {
  const [toast, setToast] = useState({ message: '', type: 'info' as ToastType, visible: false })

  const show = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    setToast({ message, type, visible: true })
    if (duration > 0) {
      setTimeout(() => setToast(s => ({ ...s, visible: false })), duration)
    }
  }, [])

  const hide = useCallback(() => {
    setToast(s => ({ ...s, visible: false }))
  }, [])

  return { toast, show, hide }
}
