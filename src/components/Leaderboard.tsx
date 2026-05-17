'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '@/lib/gameState'
import { playClick } from '@/lib/audio'

interface LeaderboardEntry {
  username: string
  challenges_completed: number
  bosses_defeated: number
  total_score: number
  updated_at: string
}

const medals = ['🥇', '🥈', '🥉']
const podiumColors = [
  'from-yellow-400/20 to-yellow-600/10 border-yellow-500/40',
  'from-gray-300/20 to-gray-400/10 border-gray-400/30',
  'from-amber-600/20 to-amber-700/10 border-amber-600/30',
]

export default function Leaderboard({ onClose }: { onClose: () => void }) {
  const game = useGame()
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(r => r.json())
      .then(d => { setEntries(d.leaderboard || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={() => { onClose(); playClick() }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="glass rounded-[var(--radius-xl)] p-5 sm:p-6 w-[540px] max-w-[90vw] max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold"><span className="glow-text">🏆 Liderlik Tablosu</span></h2>
          <button onClick={() => { onClose(); playClick() }} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition text-xl">✕</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : entries.length === 0 ? (
          <p className="text-[var(--text-muted)] text-center py-10 font-mono">Henüz kayıt yok. İlk sen ol!</p>
        ) : (
          <div className="space-y-2">
            {entries.map((e, i) => {
              const isMe = e.username === game.username
              const isTop3 = i < 3

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`rounded-[var(--radius-md)] p-3 sm:p-4 transition-all border ${
                    isMe
                      ? 'bg-[var(--accent-blue)]/10 border-[var(--accent-blue)]/30'
                      : isTop3
                        ? `bg-gradient-to-r ${podiumColors[i]}`
                        : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-8 text-center">
                      {isTop3 ? (
                        <span className="text-lg">{medals[i]}</span>
                      ) : (
                        <span className="text-xs font-mono text-[var(--text-muted)]">#{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm font-medium truncate block ${
                        isMe ? 'text-[var(--accent-blue)]' : 'text-[var(--text-primary)]'
                      }`}>
                        {e.username}
                        {isMe && <span className="text-[10px] text-[var(--accent-cyan)] ml-1">(sen)</span>}
                      </span>
                      <div className="flex gap-3 text-xs text-[var(--text-muted)] mt-0.5">
                        <span>💻 {e.challenges_completed}</span>
                        <span>👹 {e.bosses_defeated}</span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className={`font-bold font-mono text-sm ${
                        isTop3 ? 'text-[var(--warning)]' : 'text-[var(--text-secondary)]'
                      }`}>
                        {e.total_score}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] ml-0.5">XP</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
