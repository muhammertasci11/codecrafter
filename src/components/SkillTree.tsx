'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CODEX_DATA } from '@/lib/codexData'
import { useGame } from '@/lib/gameState'
import { SECTIONS } from '@/lib/gameData'

export default function SkillTree() {
  const game = useGame()
  const [activeTab, setActiveTab] = useState(0)
  const [page, setPage] = useState<'left' | 'right'>('left')
  const [flipping, setFlipping] = useState(false)
  const entry = CODEX_DATA[activeTab]

  const section = SECTIONS[activeTab]
  const completedChallenges = section?.challenges.filter(c => game.progress.completedChallenges.includes(c)).length || 0
  const totalChallenges = section?.challenges.length || 3
  const sectionComplete = completedChallenges === totalChallenges

  const handleTurn = () => {
    if (flipping) return
    setFlipping(true)
    setPage(page === 'left' ? 'right' : 'left')
    setTimeout(() => setFlipping(false), 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-3 sm:p-6"
    >
      <div className="glass rounded-[var(--radius-xl)] p-4 sm:p-6 mb-4 text-center">
        <h2 className="text-xl font-bold">
          <span className="glow-text">📖 Codex</span>
        </h2>
        <p className="text-xs text-[var(--text-secondary)] mt-1">Bilgi Ağacı — Her konsepti öğren ve ustalaş</p>
      </div>

      <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
        {CODEX_DATA.map((c, i) => (
          <button
            key={c.id}
            onClick={() => { setActiveTab(i); setPage('left') }}
            className={`px-3 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all shrink-0 border ${
              activeTab === i
                ? 'bg-white/10 text-white border-white/20'
                : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: c.color }} />
            {c.title}
            <span className="ml-1.5 text-[10px] opacity-60">
              {completedChallenges}/{totalChallenges}
            </span>
          </button>
        ))}
      </div>

      <div className="relative" style={{ perspective: '1200px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${page}`}
            className="glass rounded-[var(--radius-xl)] p-5 sm:p-7 min-h-[320px]"
            initial={{ rotateY: page === 'left' ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: page === 'left' ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            {page === 'left' ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📖</span>
                  <h3 className="font-bold text-base" style={{ color: entry.color }}>{entry.title}</h3>
                  {sectionComplete && <span className="text-xs text-[var(--success)] font-mono">✓ Tamamlandı</span>}
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm text-[var(--text-secondary)] whitespace-pre-line leading-relaxed">{entry.concept}</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">💻</span>
                  <h3 className="font-bold text-base" style={{ color: entry.color }}>Kod Örneği</h3>
                </div>
                <pre className="bg-[var(--bg-primary)] rounded-[var(--radius-md)] p-4 text-xs sm:text-sm font-mono text-[var(--accent-cyan)] overflow-x-auto border border-[var(--glass-border)] leading-relaxed">
                  <code>{entry.example}</code>
                </pre>
                <div className="mt-4 p-3 rounded-[var(--radius-md)] bg-[var(--warning)]/5 border border-[var(--warning)]/20">
                  <p className="text-xs text-[var(--warning)] font-medium mb-1">🎯 Mini Challenge</p>
                  <p className="text-xs text-[var(--text-secondary)]">{entry.miniChallenge}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleTurn}
          className="btn-secondary px-5 py-2.5 text-sm flex items-center gap-2"
        >
          {page === 'left' ? '📖 Kodu Gör' : '📝 Konsepte Dön'}
        </button>
        <span className="text-xs text-[var(--text-muted)] font-mono">
          {page === 'left' ? 'Konsept' : 'Kod'} · {activeTab + 1}/{CODEX_DATA.length}
        </span>
      </div>

      <button
        onClick={() => { game.setView('map') }}
        className="btn-secondary w-full mt-4 py-3 text-sm"
      >
        ⬅ Haritaya Dön
      </button>
    </motion.div>
  )
}
