'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { GameProvider, useGame, type View } from '@/lib/gameState'
import { AdProvider } from '@/lib/ads/AdProvider'
import { PurchaseProvider } from '@/lib/purchases/PurchaseProvider'
import ChallengeScreen from '@/components/ChallengeScreen'
import BossFight from '@/components/BossFight'
import SkillTree from '@/components/SkillTree'
import PaymentScreen from '@/components/PaymentScreen'
import AuthModal from '@/components/AuthModal'
import Leaderboard from '@/components/Leaderboard'
import HesabimModal from '@/components/HesabimModal'
import LanguageSelect from '@/components/LanguageSelect'
import BannerAd from '@/components/ads/BannerAd'
import ShopScreen from '@/components/shop/ShopScreen'
import CoinBalance from '@/components/shop/CoinBalance'
import GameMapList from '@/components/GameMapList'
import StoryDialog from '@/components/ui/StoryDialog'
import { STORIES } from '@/lib/gameData'
import { playClick } from '@/lib/audio'

function PaymentGate({ children }: { children: React.ReactNode }) {
  const game = useGame()
  const searchParams = useSearchParams()
  const isPaid = searchParams.get('paid') === 'true'
  const licenseKey = searchParams.get('license_key')

  useEffect(() => {
    if (isPaid && !game.isPaid) game.setPaid(true)
  }, [isPaid, game.isPaid, game.setPaid])

  useEffect(() => {
    if (licenseKey && !game.isPaid) {
      fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey }),
      })
        .then(r => r.json())
        .then(data => { if (data.valid && !data.purchase?.refunded) game.setPaid(true) })
        .catch(() => {})
    }
  }, [licenseKey])

  return <>{children}</>
}

function GameContent() {
  const game = useGame()
  const router = useRouter()
  const [showAuth, setShowAuth] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [showLangSelect, setShowLangSelect] = useState(!localStorage.getItem('codecrafter_language'))
  const [showShop, setShowShop] = useState(false)

  const syncProgress = useCallback(async () => {
    if (!game.token) return
    setSyncing(true)
    try {
      const score = game.progress.completedChallenges.length * 10 + game.progress.completedBosses.length * 50
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${game.token}` },
        body: JSON.stringify({ challengesCompleted: game.progress.completedChallenges.length, bossesDefeated: game.progress.completedBosses.length, totalScore: score }),
      })
      await fetch('/api/progress/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${game.token}` },
        body: JSON.stringify({ data: game.progress }),
      })
    } catch {}
    setSyncing(false)
  }, [game.token, game.progress])

  useEffect(() => { if (game.token) syncProgress() }, [game.progress.completedChallenges.length])

  useEffect(() => {
    if (!game.currentStoryId) {
      const p = game.progress;
      const seen = p.seenStories || [];
      const tryShow = (id: string) => {
        if (!seen.includes(id)) {
          game.showStory(id);
          return true;
        }
        return false;
      };

      if (!p.completedChallenges.length && !p.completedBosses.length) {
        tryShow('story-intro');
      } else if (p.completedBosses.includes('boss-loops')) {
        tryShow('story-functions');
      } else if (p.completedBosses.includes('boss-basics')) {
        tryShow('story-loops');
      }
    }
  }, [game.progress.completedChallenges, game.progress.completedBosses, game.currentStoryId, game.showStory, game.progress.seenStories])

  const currentStory = game.currentStoryId ? STORIES.find(s => s.id === game.currentStoryId) : null;

  const navItems: { icon: string; label: string; view: View }[] = [
    { icon: '🗺️', label: 'Harita', view: 'map' },
    { icon: '🏆', label: 'Liderlik', view: 'leaderboard' },
  ]
  if (game.progress.completedBosses.length > 0) {
    navItems.push({ icon: '⭐', label: 'Yetenekler', view: 'skillTree' })
  }

  if (showLangSelect) {
    return <LanguageSelect onComplete={() => setShowLangSelect(false)} />
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <nav className="glass border-b border-[var(--accent-blue)]/15 px-3 sm:px-4 py-2 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button onClick={() => router.push('/')} className="text-base hover:scale-110 transition-transform" title="Anasayfa">🏠</button>
          <span className="text-lg">🤖</span>
          <span className="font-bold text-sm sm:text-base text-[var(--text-primary)] hidden sm:inline">CodeCrafter</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:flex items-center gap-2 mr-1 pr-2 border-r border-white/5">
            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">🔥 <span className="text-[var(--text-secondary)] font-mono">{game.progress.streak || 0}</span></span>
            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">⚡ <span className="text-[var(--accent-blue)] font-mono">{game.progress.energy ?? 5}</span></span>
          </div>

          {navItems.map(item => (
            <button
              key={item.view}
              onClick={() => { game.setView(item.view); playClick() }}
              className={`text-xs px-2 sm:px-3 py-1.5 rounded-lg transition-all ${
                game.view === item.view
                  ? 'bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] border border-[var(--accent-blue)]/30'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5'
              }`}
            >
              {item.icon} <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}

          <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-white/5">
            <button
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-1.5 text-xs hover:bg-white/5 rounded-lg px-2 py-1 transition"
            >
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-[10px] overflow-hidden shrink-0">
                {game.photoURL ? <img src={game.photoURL} alt="" className="w-full h-full object-cover" /> : '👤'}
              </span>
              <span className="text-[var(--accent-cyan)] hidden sm:inline font-mono truncate max-w-[80px]">{game.displayName || game.username}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-white/5">
            <CoinBalance />
            <span className="text-xs text-[var(--text-muted)] font-mono">{game.progress.skillPoints} 🪙</span>
            <span className="text-xs text-[var(--text-muted)] font-mono">{game.progress.completedChallenges.length}/18</span>
            <button
              onClick={() => setShowShop(true)}
              className="text-xs text-[var(--accent-blue)] hover:text-[var(--accent-cyan)] transition ml-1"
              title="Magaza"
            >
              🛒
            </button>
          </div>
        </div>
      </nav>

      <div className="py-3 px-2 sm:py-5 sm:px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={game.view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {(game.view === 'map' || game.view === 'leaderboard') && <GameMapList />}
            {game.view === 'challenge' && <ChallengeScreen />}
            {game.view === 'boss' && <BossFight />}
            {game.view === 'skillTree' && <SkillTree />}
            {game.view === 'payment' && <PaymentScreen />}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {currentStory && <StoryDialog story={currentStory} onComplete={() => game.finishStory(currentStory.id)} />}
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        {game.view === 'leaderboard' && <Leaderboard onClose={() => game.setView('map')} />}
        {showProfile && <HesabimModal onClose={() => setShowProfile(false)} />}
        {showShop && <ShopScreen onClose={() => setShowShop(false)} />}
      </AnimatePresence>
      <BannerAd />
    </div>
  )
}

export default function GameClient() {
  return (
    <GameProvider>
      <AdProvider>
        <PurchaseProvider>
          <PaymentGate>
            <GameContent />
          </PaymentGate>
        </PurchaseProvider>
      </AdProvider>
    </GameProvider>
  )
}
