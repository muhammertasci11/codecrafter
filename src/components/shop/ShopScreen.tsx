'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '@/lib/gameState'
import { usePurchaseService, usePlatform } from '@/lib/purchases/PurchaseProvider'
import { PRODUCTS, ProductId } from '@/lib/purchases/PurchaseService'
import RewardedVideoButton from '@/components/ads/RewardedVideoButton'

interface ShopScreenProps {
  onClose: () => void
}

export default function ShopScreen({ onClose }: ShopScreenProps) {
  const game = useGame()
  const purchaseService = usePurchaseService()
  const { platform } = usePlatform()
  const [buying, setBuying] = useState<ProductId | null>(null)
  const [message, setMessage] = useState('')

  const handlePurchase = async (productId: ProductId) => {
    setBuying(productId)
    setMessage('')
    const success = await purchaseService.purchase(productId)
    if (success) {
      switch (productId) {
        case 'remove_ads':
          game.setAdsEnabled(false)
          setMessage('Reklamlar kaldirildi!')
          break
        case 'hearts_5':
          game.refillHearts()
          setMessage('+5 Kalp eklendi!')
          break
        case 'hearts_20':
          for (let i = 0; i < 4; i++) game.refillHearts()
          setMessage('+20 Kalp eklendi!')
          break
        case 'hearts_unlimited':
          game.setHeartsUnlimited(true)
          setMessage('Sinirsiz kalp aktif!')
          break
        case 'coins_100':
          game.addCoins(100)
          setMessage('+100 Coin eklendi!')
          break
        case 'coins_500':
          game.addCoins(500)
          setMessage('+500 Coin eklendi!')
          break
        case 'vip_monthly':
          game.setVIP(true)
          setMessage('VIP uyelik aktif!')
          break
      }
      setTimeout(() => setMessage(''), 3000)
    } else {
      setMessage('Satin alma basarisiz. Tekrar dene.')
      setTimeout(() => setMessage(''), 3000)
    }
    setBuying(null)
  }

  const coinPackages: ProductId[] = ['coins_100', 'coins_500']
  const heartPackages: ProductId[] = ['hearts_5', 'hearts_20', 'hearts_unlimited']

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="glass rounded-[var(--radius-xl)] p-5 sm:p-7 w-[420px] max-w-[90vw] max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold"><span className="glow-text">Magaza</span></h2>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition text-xl">✕</button>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6 p-3 rounded-[var(--radius-md)] bg-white/5 border border-[var(--glass-border)]">
          <span className="text-lg">🪙</span>
          <span className="text-2xl font-bold font-mono text-[var(--warning)]">{game.progress.coins}</span>
          <span className="text-xs text-[var(--text-muted)]">Coin</span>
        </div>

        <div className="mb-6 p-3 rounded-[var(--radius-md)] bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/15">
          <p className="text-xs text-[var(--text-muted)] mb-2">Ucretsiz Coin Kazan:</p>
          <div className="flex gap-2">
            <RewardedVideoButton rewardType="coin" rewardAmount={5} label="Video Izle +5 Coin" />
            <RewardedVideoButton rewardType="heart" rewardAmount={1} label="Video Izle +1 Kalp" variant="ghost" />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">Coin Paketleri</h3>
          <div className="grid grid-cols-2 gap-3">
            {coinPackages.map(id => {
              const p = PRODUCTS[id]
              return (
                <button
                  key={id}
                  onClick={() => handlePurchase(id)}
                  disabled={buying === id}
                  className="glass rounded-[var(--radius-md)] p-4 text-center hover:bg-white/10 transition border border-[var(--glass-border)] disabled:opacity-50"
                >
                  <span className="text-2xl block mb-1">{id === 'coins_100' ? '🪙' : '🪙🪙'}</span>
                  <span className="text-sm font-bold text-[var(--text-primary)] block">{p.name}</span>
                  <span className="text-xs text-[var(--accent-blue)] font-mono">
                    {buying === id ? '⏳' : `$${p.price}`}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">Kalp Paketleri</h3>
          <div className="grid grid-cols-3 gap-2">
            {heartPackages.map(id => {
              const p = PRODUCTS[id]
              return (
                <button
                  key={id}
                  onClick={() => handlePurchase(id)}
                  disabled={buying === id}
                  className="glass rounded-[var(--radius-md)] p-3 text-center hover:bg-white/10 transition border border-[var(--glass-border)] disabled:opacity-50"
                >
                  <span className="text-lg block mb-1">{id === 'hearts_5' ? '❤️' : id === 'hearts_20' ? '💖' : '♾️'}</span>
                  <span className="text-xs font-bold text-[var(--text-primary)] block">{p.name}</span>
                  <span className="text-[10px] text-[var(--accent-pink)] font-mono">
                    {buying === id ? '⏳' : `$${p.price}`}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">Premium</h3>
          <button
            onClick={() => handlePurchase('remove_ads')}
            disabled={buying === 'remove_ads' || !game.progress.adsEnabled}
            className={`w-full glass rounded-[var(--radius-md)] p-4 flex items-center justify-between hover:bg-white/10 transition border disabled:opacity-50 ${!game.progress.adsEnabled ? 'border-[var(--success)]/30' : 'border-[var(--glass-border)]'}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🚫</span>
              <div className="text-left">
                <span className="text-sm font-bold text-[var(--text-primary)] block">{PRODUCTS.remove_ads.name}</span>
                <span className="text-xs text-[var(--text-muted)]">{PRODUCTS.remove_ads.description}</span>
              </div>
            </div>
            <span className="text-sm text-[var(--accent-blue)] font-mono">
              {game.progress.adsEnabled ? `$${PRODUCTS.remove_ads.price}` : '✅'}
            </span>
          </button>
          <button
            onClick={() => handlePurchase('vip_monthly')}
            disabled={buying === 'vip_monthly' || game.progress.isVIP}
            className={`w-full glass rounded-[var(--radius-md)] p-4 flex items-center justify-between hover:bg-white/10 transition border disabled:opacity-50 ${game.progress.isVIP ? 'border-[var(--accent-purple)]/30' : 'border-[var(--glass-border)]'}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">👑</span>
              <div className="text-left">
                <span className="text-sm font-bold text-[var(--text-primary)] block">{PRODUCTS.vip_monthly.name}</span>
                <span className="text-xs text-[var(--text-muted)]">{PRODUCTS.vip_monthly.description}</span>
              </div>
            </div>
            <span className="text-sm text-[var(--accent-purple)] font-mono">
              {game.progress.isVIP ? '✅ Aktif' : `$${PRODUCTS.vip_monthly.price}/ay`}
            </span>
          </button>
        </div>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-center text-[var(--success)]"
          >
            {message}
          </motion.p>
        )}

        <p className="mt-4 text-[10px] text-[var(--text-muted)] text-center">
          {platform === 'mobile' ? 'Google Play uzerinden' : 'Gumroad uzerinden'} guvenli odeme
        </p>
      </motion.div>
    </motion.div>
  )
}
