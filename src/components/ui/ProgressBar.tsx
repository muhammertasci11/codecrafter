'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  max: number
  variant?: 'default' | 'boss' | 'health' | 'xp'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  showPercent?: boolean
  className?: string
}

const colors = {
  default: 'from-[var(--accent-blue)] to-[var(--accent-purple)]',
  boss: 'from-[var(--accent-purple)] to-[var(--accent-pink)]',
  health: 'from-[var(--success)] via-[var(--warning)] to-[var(--danger)]',
  xp: 'from-[var(--accent-cyan)] to-[var(--accent-blue)]',
}

const heights = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

export default function ProgressBar({
  value,
  max,
  variant = 'default',
  size = 'md',
  label,
  showPercent = false,
  className = '',
}: ProgressBarProps) {
  const percent = Math.min((value / max) * 100, 100)

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-xs text-[var(--text-secondary)] font-medium">{label}</span>
          )}
          {showPercent && (
            <span className="text-xs text-[var(--text-muted)]">{Math.round(percent)}%</span>
          )}
        </div>
      )}
      <div
        className={`w-full rounded-full bg-[var(--bg-tertiary)] overflow-hidden ${heights[size]}`}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colors[variant]} relative`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, duration: 0.6 }}
        >
          {size === 'lg' && (
            <div className="absolute inset-0 bg-white/10 rounded-full animate-shimmer" />
          )}
        </motion.div>
      </div>
    </div>
  )
}
