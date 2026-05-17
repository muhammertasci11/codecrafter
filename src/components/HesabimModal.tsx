'use client'

import { motion } from 'framer-motion'
import { useGame, ALL_LANGUAGES } from '@/lib/gameState'
import { UI_LANG_META } from '@/lib/i18n'
import CodyReaction from '@/components/CodyReaction'
import ProgressBar from '@/components/ui/ProgressBar'
import { usePurchaseService } from '@/lib/purchases/PurchaseProvider'
import RewardedVideoButton from '@/components/ads/RewardedVideoButton'
import { signInWithGoogle, signOutUser } from '@/lib/firebase'

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

interface HesabimModalProps {
  onClose: () => void
}

export default function HesabimModal({ onClose }: HesabimModalProps) {
  const game = useGame()
  const purchaseService = usePurchaseService()

  const xp = game.progress.xp
  const level = Math.floor(xp / 500) + 1
  const xpInLevel = xp % 500
  const totalChallenges = 18

  const earnedBadges = badges.filter(b =>
    b.check(game.progress.completedChallenges.length, game.progress.completedBosses.length, 0, game.progress.ownedSkills.length)
  )

  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle()
    if (user) {
      game.setFirebaseUser({
        uid: user.uid,
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        photoURL: user.photoURL || '',
      })
    }
  }

  const handleLogout = async () => {
    await signOutUser()
    game.logout()
    onClose()
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
        className="glass rounded-2xl w-[420px] max-w-[90vw] max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-bold"><span className="glow-text">Hesabım</span></h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition text-xl">✕</button>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-xl shrink-0 overflow-hidden">
              {game.photoURL ? (
                <img src={game.photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                '👤'
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm truncate">{game.displayName || game.username || 'Misafir'}</div>
              <div className="text-gray-500 text-xs truncate">{game.email || 'Giriş yapılmadı'}</div>
              {game.firebaseUser ? (
                <div className="text-cyan-400 text-[11px]">✦ Google hesabı bağlı</div>
              ) : (
                <button onClick={handleGoogleLogin} className="text-indigo-400 text-[11px] hover:underline">
                  🔗 Google ile bağla
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { value: level, label: 'Level', color: 'from-indigo-500 to-purple-600' },
              { value: xp.toLocaleString(), label: 'XP', color: 'from-cyan-500 to-blue-600' },
              { value: game.progress.coins, label: 'Coin', color: 'from-yellow-500 to-amber-600' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: `linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.05))` }}>
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-gray-500 text-[11px]">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Level {level}</span>
              <span>{xp} / {level * 500} XP</span>
            </div>
            <ProgressBar value={xpInLevel} max={500} variant="xp" size="sm" showPercent />
          </div>

          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">📊 İstatistikler</h4>
            {[
              { label: 'Tamamlanan Challenge', value: `${game.progress.completedChallenges.length} / ${totalChallenges}` },
              { label: 'Yenilen Boss', value: `${game.progress.completedBosses.length} / 6` },
              { label: 'Seri (Streak)', value: `🔥 ${game.progress.streak || 0} gün` },
              { label: 'Premium', value: game.progress.isVIP ? '✦ Aktif' : '—' },
            ].map(s => (
              <div key={s.label} className="flex justify-between py-1.5 border-b border-white/5 last:border-0">
                <span className="text-xs text-gray-400">{s.label}</span>
                <span className="text-xs text-white font-medium">{s.value}</span>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">🎖️ Rozetler ({earnedBadges.length}/{badges.length})</h4>
            <div className="grid grid-cols-4 gap-1.5">
              {badges.map(b => {
                const earned = earnedBadges.find(eb => eb.id === b.id)
                return (
                  <div key={b.id} className={`rounded-lg p-1.5 text-center transition-all ${earned ? 'bg-white/5' : 'opacity-20'}`} title={earned ? b.name : '???'}>
                    <span className="text-base block">{earned ? b.icon : '🔒'}</span>
                    <span className="text-[9px] text-gray-500 leading-tight block">{earned ? b.name : '???'}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">⚙️ Ayarlar</h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03]">
                <span className="text-xs text-gray-300">🌐 Kod Dili</span>
                <select
                  value={game.preferredLanguage}
                  onChange={e => game.setLanguage(e.target.value as any)}
                  className="text-xs bg-transparent text-gray-500 border-none outline-none text-right"
                >
                  {ALL_LANGUAGES.map(l => (
                    <option key={l.id} value={l.id}>{l.icon} {l.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03]">
                <span className="text-xs text-gray-300">🔤 Arayüz Dili</span>
                <select
                  value={game.uiLanguage}
                  onChange={e => game.setUiLanguage(e.target.value as any)}
                  className="text-xs bg-transparent text-gray-500 border-none outline-none text-right"
                >
                  {UI_LANG_META.map(l => (
                    <option key={l.id} value={l.id}>{l.flag} {l.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03]">
                <span className="text-xs text-gray-300">📺 Reklamlar</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!game.progress.adsEnabled}
                    onChange={() => game.setAdsEnabled(!game.progress.adsEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            </div>
          </div>

          <RewardedVideoButton rewardType="coin" rewardAmount={5} label="📺 Reklam Izle +5 Coin" />

          {!game.progress.isVIP && (
            <button onClick={async () => { await purchaseService.purchase('remove_ads'); game.setAdsEnabled(false) }} className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition">
              🚫 Reklamlari Kaldir — $4.99
            </button>
          )}

          <button onClick={handleLogout} className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition">
            🚪 Çıkış Yap
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
