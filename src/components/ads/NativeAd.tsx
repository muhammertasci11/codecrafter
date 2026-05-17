'use client'

import { useEffect, useRef } from 'react'
import { useAdService } from '@/lib/ads/AdProvider'
import { useGame } from '@/lib/gameState'

interface NativeAdProps {
  id: string
}

export default function NativeAd({ id }: NativeAdProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const adService = useAdService()
  const game = useGame()

  useEffect(() => {
    if (!containerRef.current) return
    if (!game.progress.adsEnabled || game.progress.isVIP) return
    const containerId = `native-ad-${id}`
    containerRef.current.id = containerId
    adService.showNative(containerId)
  }, [id, adService, game.progress.adsEnabled, game.progress.isVIP])

  if (!game.progress.adsEnabled || game.progress.isVIP) return null

  return (
    <div
      ref={containerRef}
      className="mt-4 p-3 rounded-[var(--radius-md)] bg-white/5 border border-[var(--glass-border)] min-h-[80px] flex items-center justify-center"
    >
      <span className="text-xs text-[var(--text-muted)]">Reklam</span>
    </div>
  )
}
