'use client'

import { motion } from 'framer-motion'

export type CodyMood = 'idle' | 'happy' | 'sad' | 'nervous'

interface CodyReactionProps {
  mood?: CodyMood
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { svg: 'w-12 h-14', eyes: 4, mouth: 2 },
  md: { svg: 'w-20 h-24', eyes: 6, mouth: 3 },
  lg: { svg: 'w-28 h-32', eyes: 8, mouth: 4 },
}

const moodAnimations: Record<CodyMood, { y?: number[]; x?: number[]; rotate?: number[] }> = {
  idle: { y: [0, -4, 0] },
  happy: { y: [0, -8, 0], rotate: [0, -5, 5, -5, 0] },
  sad: { y: [0, 2, 0] },
  nervous: { x: [0, -3, 3, -3, 0] },
}

const moodDurations: Record<CodyMood, number> = {
  idle: 3,
  happy: 0.6,
  sad: 1.5,
  nervous: 0.3,
}

const eyeColors: Record<CodyMood, string> = {
  idle: '#00d4ff',
  happy: '#22d3ee',
  sad: '#64748b',
  nervous: '#f59e0b',
}

export default function CodyReaction({ mood = 'idle', size = 'md', className = '' }: CodyReactionProps) {
  const s = sizes[size]

  return (
    <motion.svg
      viewBox="0 0 120 140"
      className={`${s.svg} ${className}`}
      fill="none"
      animate={moodAnimations[mood]}
      transition={{ duration: moodDurations[mood], repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="35" y="30" width="50" height="55" rx="8" fill="url(#bodyGrad)" stroke="#00d4ff" strokeWidth="1.5" />
      <rect x={42} y="38" width="16" height="8" rx="2" fill={eyeColors[mood]} className={mood === 'idle' ? 'animate-pulse-glow' : ''} />
      <rect x={62} y="38" width="16" height="8" rx="2" fill={eyeColors[mood]} className={mood === 'idle' ? 'animate-pulse-glow' : ''} style={mood === 'idle' ? { animationDelay: '0.5s' } : {}} />
      <rect x={51} y={55 - (s.eyes - 4) * 2} width="18" height={mood === 'happy' ? 6 : mood === 'sad' ? 2 : 4} rx="2" fill="#7c3aed" />
      {mood === 'happy' && (
        <>
          <rect x="42" y="48" width="3" height="3" rx="1.5" fill="#22d3ee" opacity="0.8" />
          <rect x="75" y="48" width="3" height="3" rx="1.5" fill="#22d3ee" opacity="0.8" />
        </>
      )}
      {mood === 'sad' && (
        <>
          <circle cx="42" cy="65" r="2" fill="#22d3ee" opacity="0.3" />
          <circle cx="78" cy="65" r="2" fill="#22d3ee" opacity="0.3" />
        </>
      )}
      <line x1="60" y1="15" x2="60" y2="30" stroke="#00d4ff" strokeWidth="2" />
      <circle cx="60" cy="12" r="4" fill="#00d4ff" className="animate-pulse-glow" />
      <rect x="30" y="25" width="8" height="2" rx="1" fill="#00d4ff" opacity="0.4" />
      <rect x="82" y="25" width="8" height="2" rx="1" fill="#00d4ff" opacity="0.4" />
      <defs>
        <linearGradient id="bodyGrad" x1="35" y1="30" x2="85" y2="85">
          <stop stopColor="#12122a" />
          <stop offset="1" stopColor="#1a1a3a" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
