'use client'

import { useEffect, useRef } from 'react'
import { useAdService } from '@/lib/ads/AdProvider'
import { useGame } from '@/lib/gameState'

interface InterstitialAdProps {
  show: boolean
  onClose?: () => void
}

export default function InterstitialAd({ show, onClose }: InterstitialAdProps) {
  const adService = useAdService()
  const game = useGame()
  const shownRef = useRef(false)

  useEffect(() => {
    if (!show || shownRef.current) return
    if (!game.progress.adsEnabled || game.progress.isVIP) {
      onClose?.()
      return
    }
    shownRef.current = true
    adService.showInterstitial(() => {
      onClose?.()
      setTimeout(() => { shownRef.current = false }, 1000)
    })
  }, [show, adService, game.progress.adsEnabled, game.progress.isVIP, onClose])

  return null
}
