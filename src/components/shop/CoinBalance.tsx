'use client'

import { useGame } from '@/lib/gameState'

export default function CoinBalance() {
  const game = useGame()
  return <span className="text-[var(--warning)] font-bold text-xs font-mono">{game.progress.coins} 🪙</span>
}
