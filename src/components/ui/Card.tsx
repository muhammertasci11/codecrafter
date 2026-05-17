'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'glass' | 'gradient' | 'bordered'
  hover?: boolean
  glow?: 'blue' | 'purple' | 'cyan' | 'none'
  onClick?: () => void
  padding?: 'sm' | 'md' | 'lg'
}

const paddings = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const glowStyles = {
  blue: '0 0 20px rgba(0,212,255,0.15)',
  purple: '0 0 20px rgba(124,58,237,0.15)',
  cyan: '0 0 20px rgba(34,211,238,0.15)',
  none: 'none',
}

export default function Card({
  children,
  className = '',
  variant = 'glass',
  hover = true,
  glow = 'blue',
  onClick,
  padding = 'md',
}: CardProps) {
  const baseStyles = 'rounded-[var(--radius-lg)] transition-all duration-300'

  const variantStyles = {
    glass: 'glass',
    gradient: 'card',
    bordered: 'bg-transparent border border-[var(--glass-border)] rounded-[var(--radius-lg)]',
  }

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${paddings[padding]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover={hover ? {
        y: -3,
        boxShadow: glowStyles[glow],
        borderColor: 'rgba(0,212,255,0.3)',
      } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
