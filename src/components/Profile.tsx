'use client'

import { motion } from 'framer-motion'
import { useGame, ALL_LANGUAGES } from '@/lib/gameState'
import { UI_LANG_META } from '@/lib/i18n'
import CodyReaction from '@/components/CodyReaction'
import ProgressBar from '@/components/ui/ProgressBar'
import { usePurchaseService } from '@/lib/purchases/PurchaseProvider'
import RewardedVideoButton from '@/components/ads/RewardedVideoButton'

const badges: { id: string; name: string; icon: string; check: (c: number, b: number, t: number, s: number) => boolean }[] = [
  { id: 'first', name: 'İlk Adım', icon: '🌱', check: (c) => c >= 1 },
  { id: 'five', name: '5 Challenge', icon: '⭐', check: (c) => c >= 5 },
  { id: 'ten', name: '10 Challenge', icon: '🌟', check: (c) => c >= 10 },
  { id: 'all', name: 'Tüm Challenge\'lar', icon: '💎', check: (c) => c >= 18 },
  { id: 'boss1', name: 'İlk Boss', icon: '👹', check: (_c, b) => b >= 1 },
  { id: 'boss3', name: '3 Boss', icon: '🐉', check: (_c, b) => b >= 3 },
  { id: 'boss6', name: 'Tüm Boss\'lar', icon: '🏆', check: (_c, b) => b >= 6 },
  { id: 'skill', name: 'İlk Yetenek', icon: '🛡️', check: (_c, _b, _t, s) => s >= 1 },
]

interface ProfileProps {
  onClose: () => void
}

export default function Profile({ onClose }: ProfileProps) {
  const game = useGame()
  const purchaseService = usePurchaseService()
  const { progress, username } = game

  const xp = progress.xp
  const level = Math.floor(xp / 500) + 1
  const xpInLevel = xp % 500
  const totalChallenges = 18

  const earnedBadges = badges.filter(b =>
    b.check(progress.completedChallenges.length, progress.completedBosses.length, 0, progress.ownedSkills.length)
  )

  const handleRemoveAds = async () => {
    await purchaseService.purchase('remove_ads')
    game.setAdsEnabled(false)
  }

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
          <h2 className="text-lg font-bold"><span className="glow-text">Profil</span></h2>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition text-xl">✕</button>
        </div>

        <div className="text-center mb-6">
          <CodyReaction mood="happy" size="lg" className="mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{username || 'CodeCrafter'}</h3>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-xs font-mono text-[var(--accent-purple)]">Level {level}</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">{xp} XP</span>
          </div>
          <div className="mt-3">
            <ProgressBar value={xpInLevel} max={500} variant="xp" size="sm" label={`Level ${level} → ${level + 1}`} showPercent />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { label: 'Challenge', value: `${progress.completedChallenges.length}/${totalChallenges}`, icon: '💻' },
            { label: 'Boss', value: `${progress.completedBosses.length}/6`, icon: '👹' },
            { label: 'Yetenek', value: `${progress.ownedSkills.length}/6`, icon: '⭐' },
            { label: 'Reklam', value: `${progress.adRevenue} gosterim`, icon: '📺' },
          ].map(s => (
            <div key={s.label} className="glass rounded-[var(--radius-md)] p-2 text-center">
              <span className="text-lg block mb-1">{s.icon}</span>
              <span className="text-sm font-bold text-[var(--text-primary)] font-mono block">{s.value}</span>
              <span className="text-[9px] text-[var(--text-muted)]">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">Rozetler ({earnedBadges.length}/{badges.length})</h4>
          <div className="grid grid-cols-4 gap-2">
            {badges.map(b => {
              const earned = earnedBadges.find(eb => eb.id === b.id)
              return (
                <div
                  key={b.id}
                  className={`rounded-[var(--radius-md)] p-2 text-center transition-all ${
                    earned ? 'bg-white/5 border border-white/10' : 'opacity-20'
                  }`}
                  title={earned ? b.name : '??? (Henüz kazanılmadı)'}
                >
                  <span className="text-lg block">{earned ? b.icon : '🔒'}</span>
                  <span className="text-[9px] text-[var(--text-muted)] leading-tight block mt-0.5">{earned ? b.name : '???'}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border-t border-[var(--glass-border)] pt-4 space-y-3">
          <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Ayarlar</h4>

          <RewardedVideoButton rewardType="coin" rewardAmount={5} label="Video Izle +5 Coin" />

          <div>
            <p className="text-xs text-[var(--text-muted)] mb-2">Premium:</p>
            {game.progress.isVIP && (
              <div className="px-3 py-2 rounded-[var(--radius-md)] bg-[var(--accent-purple)]/10 border border-[var(--accent-purple)]/20 text-xs text-[var(--accent-purple)] flex items-center gap-2 mb-2">
                <span>👑</span> VIP Aktif — Reklamsiz + Sinirsiz Kalp
              </div>
            )}
            {!game.progress.isVIP && (
              <div>
                <button
                  onClick={handleRemoveAds}
                  className="w-full text-left px-4 py-3 rounded-[var(--radius-md)] bg-white/5 border border-[var(--glass-border)] text-sm hover:bg-white/10 transition mb-2"
                >
                  🚫 Reklamlari Kaldir — $4.99
                </button>
                <label className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <input
                    type="checkbox"
                    checked={!!progress.adsEnabled}
                    onChange={() => game.setAdsEnabled(!progress.adsEnabled)}
                    className="h-4 w-4"
                  />
                  Reklamlari Ac/Kapat
                </label>
              </div>
            )}
          </div>

          <div>
            <p className="text-xs text-[var(--text-muted)] mb-2">Programlama Dili:</p>
            <div className="flex gap-1.5 flex-wrap">
              {ALL_LANGUAGES.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => game.setLanguage(lang.id)}
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-all border ${
                    game.preferredLanguage === lang.id
                      ? 'bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] border-[var(--accent-blue)]/30'
                      : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)] hover:border-[var(--glass-border)]'
                  }`}
                >
                  {lang.icon} {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-[var(--text-muted)] mb-2">Uygulama Dili:</p>
            <div className="flex gap-1.5 flex-wrap">
              {UI_LANG_META.map(l => (
                <button
                  key={l.id}
                  onClick={() => game.setUiLanguage(l.id as any)}
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-all border ${
                    game.uiLanguage === l.id
                      ? 'bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] border-[var(--accent-blue)]/30'
                      : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)] hover:border-[var(--glass-border)]'
                  }`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { game.logout(); onClose() }}
            className="w-full text-left px-4 py-3 rounded-[var(--radius-md)] bg-[var(--danger)]/10 border border-[var(--danger)]/20 text-[var(--danger)] text-sm hover:bg-[var(--danger)]/20 transition"
          >
            🚪 Cikis Yap
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
