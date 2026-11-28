'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdService } from '@/lib/ads/AdProvider'
import { useGame } from '@/lib/gameState'

interface RewardedVideoButtonProps {
  rewardType: 'energy' | 'coin'
  rewardAmount: number
  onReward?: () => void
  label?: string
  variant?: 'primary' | 'ghost'
  disabled?: boolean
}

export default function RewardedVideoButton({
  rewardType,
  rewardAmount,
  onReward,
  label,
  variant = 'primary',
  disabled = false,
}: RewardedVideoButtonProps) {
  const adService = useAdService()
  const game = useGame()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  if (!game.progress.adsEnabled || game.progress.isVIP) return null

  const defaultLabel = rewardType === 'energy'
    ? `Video Izle +${rewardAmount} Enerji`
    : `Video Izle +${rewardAmount} Coin`

  const icon = rewardType === 'energy' ? '⚡' : '🪙'

  const handleClick = () => {
    setLoading(true)
    setError(false)
    adService.showRewardedVideo(
      () => {
        setLoading(false)
        if (rewardType === 'energy') {
          game.refillEnergy()
        } else {
          game.addCoins(rewardAmount)
        }
        onReward?.()
      },
      () => {
        setLoading(false)
        setError(true)
        setTimeout(() => setError(false), 3000)
      }
    )
  }

  if (variant === 'ghost') {
    return (
      <button
        onClick={handleClick}
        disabled={loading || disabled}
        className="text-xs text-[var(--accent-blue)] hover:text-[var(--accent-cyan)] transition flex items-center gap-1 disabled:opacity-50"
      >
        {loading ? '⏳' : '📺'} {loading ? 'Yükleniyor...' : (error ? 'Hata' : (label || defaultLabel))}
      </button>
    )
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={loading || disabled}
      className={`px-4 py-2 text-xs sm:text-sm rounded-[var(--radius-md)] font-medium transition-all flex items-center gap-2 ${
        loading ? 'opacity-50 cursor-wait' : error ? 'bg-[var(--danger)]/20 text-[var(--danger)] border border-[var(--danger)]/30' :
        'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] border border-[var(--accent-blue)]/25 hover:bg-[var(--accent-blue)]/25'
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {loading ? '⏳' : '📺'} {loading ? 'Reklam Yükleniyor...' : (error ? 'Reklam Yüklenemedi' : `${icon} ${label || defaultLabel}`)}
    </motion.button>
  )
}
