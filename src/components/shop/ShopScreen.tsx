'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '@/lib/gameState'
import { usePurchaseService, usePlatform } from '@/lib/purchases/PurchaseProvider'
import { PRODUCTS, ProductId } from '@/lib/purchases/PurchaseService'
import RewardedVideoButton from '@/components/ads/RewardedVideoButton'
import { COSMETICS, CosmeticCategory } from '@/lib/cosmeticsData'

interface ShopScreenProps {
  onClose: () => void
}

export default function ShopScreen({ onClose }: ShopScreenProps) {
  const game = useGame()
  const purchaseService = usePurchaseService()
  const { platform } = usePlatform()
  const [buying, setBuying] = useState<ProductId | null>(null)
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'store' | 'cosmetics'>('store')

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
        case 'energy_5':
          game.refillEnergy()
          setMessage('+5 Enerji eklendi!')
          break
        case 'energy_20':
          for (let i = 0; i < 4; i++) game.refillEnergy()
          setMessage('+20 Enerji eklendi!')
          break
        case 'energy_unlimited':
          game.setEnergyUnlimited(true)
          setMessage('Sinirsiz enerji aktif!')
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

  const handleCosmeticPurchase = (id: string, price: number) => {
    if (game.progress.coins >= price) {
      if (game.progress.ownedCosmetics?.includes(id)) {
        setMessage('Bu esyaya zaten sahipsin.')
      } else {
        game.spendCoins(price)
        game.buyCosmetic(id)
        setMessage('Satin alindi!')
      }
    } else {
      setMessage('Yeterli coin yok.')
    }
    setTimeout(() => setMessage(''), 3000)
  }

  const coinPackages: ProductId[] = ['coins_100', 'coins_500']
  const energyPackages: ProductId[] = ['energy_5', 'energy_20', 'energy_unlimited']

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
        className="glass rounded-[var(--radius-xl)] p-5 sm:p-7 w-[420px] max-w-[90vw] max-h-[85vh] overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold"><span className="glow-text">Magaza</span></h2>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition text-xl">✕</button>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6 p-3 rounded-[var(--radius-md)] bg-white/5 border border-[var(--glass-border)]">
          <span className="text-lg">🪙</span>
          <span className="text-2xl font-bold font-mono text-[var(--warning)]">{game.progress.coins}</span>
          <span className="text-xs text-[var(--text-muted)]">Coin</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('store')}
            className={`flex-1 py-2 rounded-[var(--radius-md)] text-sm font-bold transition-colors ${activeTab === 'store' ? 'bg-[var(--accent-blue)] text-white' : 'glass text-[var(--text-muted)] hover:text-white'}`}
          >
            Magaza
          </button>
          <button
            onClick={() => setActiveTab('cosmetics')}
            className={`flex-1 py-2 rounded-[var(--radius-md)] text-sm font-bold transition-colors ${activeTab === 'cosmetics' ? 'bg-[var(--accent-purple)] text-white' : 'glass text-[var(--text-muted)] hover:text-white'}`}
          >
            Kozmetik
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          {activeTab === 'store' && (
            <div className="space-y-6">
              <div className="p-3 rounded-[var(--radius-md)] bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/15">
                <p className="text-xs text-[var(--text-muted)] mb-2">Ucretsiz Coin Kazan:</p>
                <div className="flex gap-2">
                  <RewardedVideoButton rewardType="coin" rewardAmount={5} label="Video Izle +5 Coin" />
                  <RewardedVideoButton rewardType="energy" rewardAmount={1} label="Video Izle +1 Enerji" variant="ghost" />
                </div>
              </div>

              <div>
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

              <div>
                <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">Enerji Paketleri</h3>
                <div className="grid grid-cols-3 gap-2">
                  {energyPackages.map(id => {
                    const p = PRODUCTS[id]
                    return (
                      <button
                        key={id}
                        onClick={() => handlePurchase(id)}
                        disabled={buying === id}
                        className="glass rounded-[var(--radius-md)] p-3 text-center hover:bg-white/10 transition border border-[var(--glass-border)] disabled:opacity-50"
                      >
                        <span className="text-lg block mb-1">{id === 'energy_5' ? '⚡' : id === 'energy_20' ? '⚡⚡' : '♾️'}</span>
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
            </div>
          )}

          {activeTab === 'cosmetics' && (
            <div className="space-y-6">
              {['avatarFrame', 'nameColor', 'codeTheme', 'victoryEffect'].map(category => (
                <div key={category}>
                  <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                    {category === 'avatarFrame' ? 'Profil Cerceveleri' :
                     category === 'nameColor' ? 'Isim Renkleri' :
                     category === 'codeTheme' ? 'Kod Temalari' : 'Zafer Efektleri'}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {COSMETICS.filter(c => c.category === category).map(c => {
                      const isOwned = game.progress.ownedCosmetics?.includes(c.id)
                      const isEquipped = game.progress.equippedCosmetics?.[category as CosmeticCategory] === c.id
                      const canBuy = game.progress.coins >= c.price

                      return (
                        <div key={c.id} className="glass rounded-[var(--radius-md)] p-3 flex items-center gap-3 border border-[var(--glass-border)]">
                          <span className="text-2xl">{c.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-[var(--text-primary)]">{c.name}</h4>
                            <p className="text-[10px] text-[var(--text-muted)]">{c.description}</p>
                          </div>
                          
                          {isEquipped ? (
                            <button className="px-3 py-1.5 rounded bg-[var(--success)]/20 text-[var(--success)] text-xs font-bold whitespace-nowrap">
                              Kusnildi
                            </button>
                          ) : isOwned ? (
                            <button
                              onClick={() => {
                                game.equipCosmetic(category as CosmeticCategory, c.id)
                                setMessage('Kusanildi!')
                                setTimeout(() => setMessage(''), 2000)
                              }}
                              className="px-3 py-1.5 rounded glass hover:bg-white/10 text-[var(--text-primary)] text-xs font-bold transition whitespace-nowrap"
                            >
                              Kusan
                            </button>
                          ) : (
                            <button
                              onClick={() => handleCosmeticPurchase(c.id, c.price)}
                              disabled={!canBuy}
                              className="px-3 py-1.5 rounded bg-[var(--warning)]/20 hover:bg-[var(--warning)]/30 text-[var(--warning)] text-xs font-bold transition disabled:opacity-50 whitespace-nowrap flex items-center gap-1"
                            >
                              <span>🪙</span> {c.price}
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-center text-[var(--success)] shrink-0"
          >
            {message}
          </motion.p>
        )}

        {activeTab === 'store' && (
          <p className="mt-4 text-[10px] text-[var(--text-muted)] text-center shrink-0">
            {platform === 'mobile' ? 'Google Play uzerinden' : 'Gumroad uzerinden'} guvenli odeme
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}
