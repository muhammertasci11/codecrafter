'use client'

import { useEffect, useRef } from 'react'
import { useAdService } from '@/lib/ads/AdProvider'
import { useGame } from '@/lib/gameState'

export default function BannerAd() {
  const containerRef = useRef<HTMLDivElement>(null)
  const adService = useAdService()
  const game = useGame()

  useEffect(() => {
    if (!containerRef.current) return
    if (!game.progress.adsEnabled) return
    adService.showBanner('banner-ad-container')
    return () => adService.hideBanner()
  }, [adService, game.progress.adsEnabled])

  if (!game.progress.adsEnabled) return null

  return (
    <div
      id="banner-ad-container"
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-[var(--bg-primary)]/90 backdrop-blur-sm border-t border-[var(--accent-blue)]/10 py-1"
    />
  )
}
