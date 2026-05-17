'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { getChallenge, getChallengeLang } from '@/lib/gameData'
import { useGame } from '@/lib/gameState'
import { playComplete, playError } from '@/lib/audio'
import CodyReaction, { type CodyMood } from '@/components/CodyReaction'
import QuizChallenge from '@/components/ui/QuizChallenge'
import ProgressBar from '@/components/ui/ProgressBar'
import RewardedVideoButton from '@/components/ads/RewardedVideoButton'
import NativeAd from '@/components/ads/NativeAd'
import InterstitialAd from '@/components/ads/InterstitialAd'

const DragDropChallenge = dynamic(() => import('@/components/ui/DragDropChallenge'), { ssr: false })

const sectionColors: Record<string, string> = {
  basics: '#00d4ff',
  loops: '#7c3aed',
  functions: '#ec4899',
  arrays: '#22d3ee',
  objects: '#f59e0b',
  es6: '#00d4ff',
}

const sectionNames: Record<string, string> = {
  basics: 'Temeller', loops: 'Döngüler', functions: 'Fonksiyonlar',
  arrays: 'Diziler', objects: 'Nesneler', es6: 'ES6+',
}

const challengeIcons: Partial<Record<string, string>> = {
  quiz: '📝',
  code: '💻',
  dragdrop: '🧩',
}

export default function ChallengeScreen() {
  const game = useGame()
  const challenge = game.currentChallengeId ? getChallenge(game.currentChallengeId) : null
  const [codyMood, setCodyMood] = useState<CodyMood>('idle')
  const [challengeResult, setChallengeResult] = useState<'correct' | 'wrong' | null>(null)
  const [showInterstitial, setShowInterstitial] = useState(false)

  useEffect(() => {
    setCodyMood('nervous')
    const timer = setTimeout(() => setCodyMood('idle'), 1500)
    return () => clearTimeout(timer)
  }, [game.currentChallengeId])

  if (!challenge) return null

  const totalChallenges = 18
  const completedCount = game.progress.completedChallenges.length

  const handleCorrect = () => {
    setCodyMood('happy')
    setChallengeResult('correct')
    playComplete()
    game.addXp(50)
    game.addCoins(2)
    setTimeout(() => {
      setShowInterstitial(true)
    }, 800)
  }

  const handleWrong = () => {
    setCodyMood('sad')
    setChallengeResult('wrong')
    playError()
    const survived = game.deductEnergy()
    if (!survived) {
      game.setView('map')
    }
    setTimeout(() => setCodyMood('idle'), 1500)
  }

  const renderChallenge = () => {
    const type = challenge.type || 'code'
    if (type === 'quiz' && challenge.quiz) {
      return (
        <QuizChallenge
          quiz={challenge.quiz}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )
    }

    if (type === 'dragdrop' && challenge.dragdrop) {
      return (
        <DragDropChallenge
          dragdrop={challenge.dragdrop}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )
    }

    return <CodeChallenge challenge={challenge} onCorrect={handleCorrect} onWrong={handleWrong} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-3 sm:p-6"
    >
      <button
        onClick={() => game.setView('map')}
        className="mb-3 flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition font-mono text-sm"
      >
        ⬅ Haritaya Dön
      </button>

      <div className="glass rounded-[var(--radius-xl)] p-4 sm:p-6 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <CodyReaction mood={codyMood} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{challengeIcons[challenge.type || 'code'] || '💻'}</span>
              <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] truncate">{challenge.title}</h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">{challenge.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-mono text-white"
                style={{ background: sectionColors[challenge.section] || '#00d4ff' }}
              >
                {sectionNames[challenge.section] || challenge.section}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-mono">{challenge.type || 'code'}</span>
            </div>
          </div>
        </div>

        <ProgressBar
          value={completedCount}
          max={totalChallenges}
          variant="default"
          size="sm"
          label={`İlerleme ${completedCount}/${totalChallenges}`}
        />
      </div>

      <div className="glass rounded-[var(--radius-xl)] p-4 sm:p-6 mb-4">
        {renderChallenge()}
      </div>

      {challengeResult === 'correct' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-[var(--radius-md)] bg-[var(--success)]/10 border border-[var(--success)]/30 text-center"
        >
          <span className="text-sm font-bold text-[var(--success)]">Tebrikler! +50 XP +2 Coin</span>
          <div className="flex justify-center gap-2 mt-2">
            <RewardedVideoButton rewardType="coin" rewardAmount={3} label="Video Izle +3 Coin" variant="ghost" />
          </div>
          <NativeAd id="challenge-result" />
        </motion.div>
      )}
      {challengeResult === 'wrong' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-[var(--radius-md)] bg-[var(--danger)]/10 border border-[var(--danger)]/30 text-center"
        >
          <span className="text-sm font-bold text-[var(--danger)]">Yanlis cevap! -1 Enerji</span>
          <div className="flex justify-center gap-2 mt-2">
            <RewardedVideoButton rewardType="energy" rewardAmount={1} label="Video Izle +1 Enerji" />
          </div>
        </motion.div>
      )}
      <InterstitialAd show={showInterstitial} onClose={() => { setShowInterstitial(false); game.completeChallenge(challenge.id) }} />
    </motion.div>
  )
}

function CodeChallenge({ challenge, onCorrect, onWrong }: {
  challenge: NonNullable<ReturnType<typeof getChallenge>>
  onCorrect: () => void
  onWrong: () => void
}) {
  const game = useGame()
  const lang = game.preferredLanguage
  const langData = getChallengeLang(challenge, lang)
  const defaultCode = langData.startingCode || ''
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState<'idle' | 'running' | 'pass' | 'fail'>('idle')

  useEffect(() => {
    const d = getChallengeLang(challenge, game.preferredLanguage)
    setCode(d.startingCode || '')
    setOutput('')
    setStatus('idle')
  }, [challenge, game.preferredLanguage])

  const runCode = async () => {
    setStatus('running')
    setOutput('')
    const lang = game.preferredLanguage
    const d = getChallengeLang(challenge, lang)
    const endpoint = lang === 'javascript' ? '/api/run' : `/api/run/${lang}`
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, tests: d.tests }),
      })
      const data = await res.json()
      if (data.passed) {
        setOutput('✅ Tüm testler geçti!')
        setStatus('pass')
        setTimeout(() => onCorrect(), 600)
      } else {
        setOutput(`❌ ${data.error || 'Test başarısız'}`)
        setStatus('fail')
        onWrong()
      }
    } catch {
      setOutput('⚠️ Bağlantı hatası')
      setStatus('fail')
      onWrong()
    }
  }

  const filename = lang === 'javascript' ? 'main.js' : lang === 'python' ? 'main.py' : 'Main.java'

  return (
    <div className="space-y-4">
      <div className="rounded-[var(--radius-md)] overflow-hidden border border-[var(--glass-border)]">
        <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-tertiary)] border-b border-[var(--glass-border)]">
          <span className="text-xs text-[var(--text-muted)] font-mono">{filename}</span>
          <span className="text-xs font-mono text-[var(--accent-blue)]">
            {lang === 'javascript' ? '🟨 JS' : lang === 'python' ? '🐍 Py' : '☕ Java'}
          </span>
        </div>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] font-mono text-sm p-4 outline-none resize-y min-h-[200px] border-0"
          spellCheck={false}
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={runCode}
          disabled={status === 'running'}
          className="btn-primary px-5 py-2 text-sm disabled:opacity-50 flex items-center gap-2"
        >
          {status === 'running' ? '🔄' : '▶'} Kodu Çalıştır
        </button>
        <button
          onClick={() => setOutput(`💡 İpucu: ${langData.hint}`)}
          className="btn-secondary px-4 py-2 text-sm"
        >
          💡 İpucu
        </button>
      </div>

      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-[var(--radius-md)] border ${
              status === 'pass' ? 'bg-[var(--success)]/10 border-[var(--success)]/30 text-[var(--success)]' :
              status === 'fail' ? 'bg-[var(--danger)]/10 border-[var(--danger)]/30 text-[var(--danger)]' :
              'bg-white/5 border-[var(--glass-border)] text-[var(--text-secondary)]'
            }`}
          >
            <pre className="whitespace-pre-wrap font-mono text-sm">{output}</pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
