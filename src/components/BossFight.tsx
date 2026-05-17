'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SECTIONS, getStageLang } from '@/lib/gameData'
import { useGame } from '@/lib/gameState'
import { playBossHit, playBossKill, playComplete, playError } from '@/lib/audio'
import CodyReaction, { type CodyMood } from '@/components/CodyReaction'
import ProgressBar from '@/components/ui/ProgressBar'
import RewardedVideoButton from '@/components/ads/RewardedVideoButton'
import InterstitialAd from '@/components/ads/InterstitialAd'

const bossIcons: Record<string, { icon: string; color: string; glow: string }> = {
  'boss-basics':    { icon: '👹', color: '#00d4ff', glow: 'rgba(0,212,255,0.3)' },
  'boss-loops':     { icon: '🐉', color: '#7c3aed', glow: 'rgba(124,58,237,0.3)' },
  'boss-functions': { icon: '👾', color: '#ec4899', glow: 'rgba(236,72,153,0.3)' },
  'boss-arrays':    { icon: '🤖', color: '#22d3ee', glow: 'rgba(34,211,238,0.3)' },
  'boss-objects':   { icon: '👻', color: '#f59e0b', glow: 'rgba(245,158,11,0.3)' },
  'boss-es6':       { icon: '💀', color: '#ef4444', glow: 'rgba(239,68,68,0.3)' },
}

const defaultBoss = { icon: '👹', color: '#7c3aed', glow: 'rgba(124,58,237,0.3)' }

export default function BossFight() {
  const game = useGame()
  const section = SECTIONS.find(s => s.boss.id === game.currentBossId)
  const boss = section?.boss
  const stage = boss?.stages[game.progress.bossStage]
  const bossStyle = boss ? bossIcons[boss.id] || defaultBoss : defaultBoss

  const lang = game.preferredLanguage
  const stageLang = stage ? getStageLang(stage, lang) : null
  const [code, setCode] = useState(stageLang?.startingCode || '')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState<'idle' | 'running' | 'pass' | 'fail'>('idle')
  const [shake, setShake] = useState(false)
  const [redFlash, setRedFlash] = useState(false)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; type: 'hit' | 'kill' | 'victory' }[]>([])
  const [codyMood, setCodyMood] = useState<CodyMood>('nervous')
  const [victory, setVictory] = useState(false)
  const [defeat, setDefeat] = useState(false)
  const [showInterstitial, setShowInterstitial] = useState(false)

  useEffect(() => {
    if (stage) {
      const sl = getStageLang(stage, game.preferredLanguage)
      setCode(sl.startingCode)
    }
    setOutput('')
    setStatus('idle')
    setCodyMood('nervous')
    setTimeout(() => setCodyMood('idle'), 1500)
  }, [game.progress.bossStage, stage, game.preferredLanguage])

  const spawnParticles = useCallback((type: 'hit' | 'kill' | 'victory') => {
    const count = type === 'victory' ? 30 : 15
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: 20 + Math.random() * 60,
      y: 15 + Math.random() * 50,
      type,
    }))
    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => setParticles([]), 1500)
  }, [])

  const handleCorrect = () => {
    setOutput('✅ Aşama geçildi!')
    setStatus('pass')
    setCodyMood('happy')
    playComplete()
    const isLastStage = game.progress.bossStage >= (boss?.stages.length || 1) - 1
    if (isLastStage) {
      spawnParticles('victory')
      playBossKill()
      setVictory(true)
      setTimeout(() => setShowInterstitial(true), 1500)
    } else {
      spawnParticles('hit')
      game.completeBossStage()
      if (stage) {
        const sl = getStageLang(stage, game.preferredLanguage)
        setCode(sl.startingCode)
      }
    }
  }

  const handleWrong = () => {
    setOutput(`❌ ${'Test başarısız'}`)
    setStatus('fail')
    setCodyMood('sad')
    playError()
    playBossHit()
    setShake(true)
    setRedFlash(true)
    setTimeout(() => { setShake(false); setRedFlash(false) }, 500)
    game.takeBossDamage()
    const survived = game.deductHeart()
    
    if (!survived || game.progress.bossHp <= 1) {
      setTimeout(() => setDefeat(true), 300)
    }
  }

  const runCode = async () => {
    if (!stage || !stageLang) return
    setStatus('running')
    setOutput('')
    const lang = game.preferredLanguage
    const sl = getStageLang(stage, lang)
    const endpoint = lang === 'javascript' ? '/api/run' : `/api/run/${lang}`
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, tests: sl.tests }),
      })
      const data = await res.json()
      if (data.passed) {
        handleCorrect()
      } else {
        handleWrong()
      }
    } catch {
      setOutput('⚠️ Bağlantı hatası')
      setStatus('fail')
    }
  }

  if (!boss || !stage) return null

  const playerHp = game.progress.bossHp
  const playerMaxHp = game.progress.bossMaxHp

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-3 sm:p-6"
    >
      {/* Boss Card */}
      <div className={`glass rounded-[var(--radius-xl)] p-5 sm:p-6 mb-4 relative overflow-hidden transition-all ${shake ? 'animate-shake' : ''}`}>
        <AnimatePresence>
          {particles.map(p => (
            <motion.span
              key={p.id}
              className="absolute text-2xl sm:text-3xl pointer-events-none z-10"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0, y: -60 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {p.type === 'victory' ? '💥' : p.type === 'hit' ? '⚡' : '💫'}
            </motion.span>
          ))}
        </AnimatePresence>

        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <motion.span
              className="text-5xl sm:text-6xl block"
              animate={shake ? { rotate: [0, -15, 15, -15, 0], scale: [1, 1.1, 1] } : { scale: [1, 1.05, 1] }}
              transition={{ duration: shake ? 0.3 : 2, repeat: shake ? 0 : Infinity }}
            >
              {bossStyle.icon}
            </motion.span>
            <div
              className="absolute -inset-4 rounded-full opacity-20 blur-md"
              style={{ background: bossStyle.glow }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: bossStyle.color }}>{boss.name}</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">{boss.description}</p>
            <div className="flex gap-3 text-xs text-[var(--text-muted)] mt-1">
              <span>Aşama {game.progress.bossStage + 1}/{boss.stages.length}</span>
              <span style={{ color: bossStyle.color }}>⚡</span>
            </div>
          </div>
          <CodyReaction mood={codyMood} size="sm" />
        </div>

        <div className="space-y-2 mb-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-muted)] font-mono">BOSS HP</span>
              <span className="font-mono" style={{ color: bossStyle.color }}>
                {'■'.repeat(game.progress.bossHp)}{'□'.repeat(game.progress.bossMaxHp - game.progress.bossHp)}
              </span>
            </div>
            <ProgressBar
              value={game.progress.bossHp}
              max={game.progress.bossMaxHp}
              variant="boss"
              size="md"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-muted)] font-mono">PLAYER HP</span>
              <span className="font-mono text-[var(--accent-cyan)]">
                {'❤️'.repeat(playerHp)}{'🖤'.repeat(Math.max(0, playerMaxHp - playerHp))}
              </span>
            </div>
            <ProgressBar
              value={playerHp}
              max={playerMaxHp}
              variant="health"
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Stage Card */}
      <div className="glass rounded-[var(--radius-xl)] p-4 sm:p-5 mb-4 border-l-4" style={{ borderLeftColor: bossStyle.color }}>
        <h3 className="font-bold text-sm sm:text-base mb-1" style={{ color: bossStyle.color }}>{stage.title}</h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">{stage.description}</p>
      </div>

      {/* Code Editor */}
      <div className="glass rounded-[var(--radius-xl)] overflow-hidden mb-4">
        <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-tertiary)] border-b border-[var(--glass-border)]">
          <span className="text-xs text-[var(--text-muted)] font-mono">boss-stage-{game.progress.bossStage + 1}.{lang === 'javascript' ? 'js' : lang === 'python' ? 'py' : 'java'}</span>
          <span className="text-xs font-mono text-[var(--accent-blue)]">
            {lang === 'javascript' ? '🟨 JS' : lang === 'python' ? '🐍 Py' : '☕ Java'}
          </span>
        </div>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] font-mono text-sm p-4 outline-none resize-y min-h-[180px] border-0"
          spellCheck={false}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 items-center">
        <motion.button
          onClick={runCode}
          disabled={status === 'running' || victory || defeat}
          className="btn-primary px-6 py-3 text-sm disabled:opacity-50 flex items-center gap-2"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          {status === 'running' ? '⚔ Saldırılıyor...' : '⚔ BOSSA SALDIR'}
        </motion.button>
        <button
          onClick={() => { if (stageLang) setOutput(`💡 ${stageLang.hint}`) }}
          className="btn-secondary px-4 py-3 text-sm"
        >
          💡 İpucu
        </button>
      </div>

      {/* Result Output */}
      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-4 p-4 rounded-[var(--radius-md)] border ${
              status === 'pass' ? 'bg-[var(--success)]/10 border-[var(--success)]/30 text-[var(--success)]' :
              'bg-[var(--danger)]/10 border-[var(--danger)]/30 text-[var(--danger)]'
            }`}
          >
            <pre className="whitespace-pre-wrap font-mono text-sm">{output}</pre>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Victory Screen */}
      <AnimatePresence>
        {victory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              className="text-center"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <motion.span
                className="text-7xl block mb-4"
                animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
              >
                🏆
              </motion.span>
              <h2 className="text-4xl font-extrabold glow-text mb-2">VICTORY!</h2>
              <p className="text-[var(--text-secondary)] mb-6">{boss.name} yenildi!</p>
              <div className="flex justify-center gap-2 mb-6">
                {[100, 150, 200].map(xp => (
                  <motion.span
                    key={xp}
                    className="text-[var(--warning)] font-bold font-mono text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + xp * 0.002 }}
                  >
                    +{xp} XP
                  </motion.span>
                ))}
              </div>
              <button onClick={() => game.setView('map')} className="btn-primary px-8 py-4 text-lg">
                ⬅ Haritaya Dön
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Defeat Screen */}
      <AnimatePresence>
        {defeat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              className="text-center"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
            >
              <motion.span
                className="text-7xl block mb-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💀
              </motion.span>
              <h2 className="text-4xl font-extrabold text-[var(--danger)] mb-2">YENİLDİN!</h2>
              <p className="text-[var(--text-secondary)] mb-6">Tekrar dene, başaracaksın!</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { setDefeat(false); game.startBoss(boss.id) }}
                  className="btn-primary px-6 py-3"
                >
                  🔄 Tekrar Dene
                </button>
                <RewardedVideoButton
                  rewardType="heart"
                  rewardAmount={2}
                  label="Video Izle +2 Kalp ile Tekrar Dene"
                  onReward={() => { setDefeat(false); game.startBoss(boss.id) }}
                />
                <button
                  onClick={() => game.setView('map')}
                  className="btn-secondary px-6 py-3"
                >
                  ⬅ Haritaya Dön
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <InterstitialAd show={showInterstitial} onClose={() => { setShowInterstitial(false); game.completeBoss() }} />

      {/* Red Flash Overlay */}
      <AnimatePresence>
        {redFlash && (
          <motion.div
            className="fixed inset-0 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ background: 'var(--danger)' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
