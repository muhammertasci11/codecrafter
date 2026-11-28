'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { SECTIONS, CHALLENGES } from '@/lib/gameData'
import { useGame } from '@/lib/gameState'
import { playClick } from '@/lib/audio'

const SECTION_ICONS: Record<string, string> = {
  basics: '📘',
  loops: '🔄',
  functions: '🔧',
  arrays: '📦',
  objects: '🎯',
  es6: '⚡',
}

export default function GameMapList() {
  const game = useGame()

  const sections = useMemo(() => SECTIONS, [])

  const canAccessSection = (sectionId: string, index: number): boolean => {
    if (index === 0) return true
    const prevSection = sections[index - 1]
    return game.progress.completedBosses.includes(prevSection.boss.id)
  }

  const isChallengeCompleted = (challengeId: string) =>
    game.progress.completedChallenges.includes(challengeId)

  const isBossCompleted = (bossId: string) =>
    game.progress.completedBosses.includes(bossId)

  const handleNodeClick = (sectionId: string, sectionIndex: number, challengeId: string) => {
    if (!canAccessSection(sectionId, sectionIndex)) return
    if (isChallengeCompleted(challengeId)) return
    playClick()
    game.startChallenge(challengeId)
  }

  const handleBossClick = (section: typeof SECTIONS[0], sectionIndex: number) => {
    if (!canAccessSection(section.id, sectionIndex)) return
    if (isBossCompleted(section.boss.id)) return
    const allDone = section.challenges.every(c => game.progress.completedChallenges.includes(c))
    if (!allDone) return
    playClick()
    game.startBoss(section.boss.id)
  }

  return (
    <div className="max-w-2xl mx-auto px-3 py-4 pb-24">
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Kod Macerası
        </motion.h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          {game.progress.completedChallenges.length}/18 meydan okuma tamamlandı
        </p>
      </div>

      <div className="relative space-y-2">
        {sections.map((section, idx) => {
          const locked = !canAccessSection(section.id, idx)
          const allChallengesDone = section.challenges.every(c => game.progress.completedChallenges.includes(c))
          const bossDone = isBossCompleted(section.boss.id)

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-2xl overflow-hidden border transition-all ${
                locked
                  ? 'opacity-40 border-gray-700/30'
                  : bossDone
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <span className="text-2xl">{SECTION_ICONS[section.id]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-sm text-[var(--text-primary)]">
                      {section.name}
                    </h2>
                    {locked && <span className="text-[10px] text-gray-500">🔒</span>}
                    {bossDone && <span className="text-emerald-400 text-xs">✅ Tamamlandı</span>}
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] truncate">{section.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-mono text-[var(--accent-cyan)]">
                    {section.challenges.filter(c => game.progress.completedChallenges.includes(c)).length}/3
                  </div>
                  <div className="w-16 h-1.5 bg-gray-700/50 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                      style={{ width: `${(section.challenges.filter(c => game.progress.completedChallenges.includes(c)).length / 3) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Path container */}
              <div className="relative">
                {/* Vertical path line */}
                <div className="absolute left-[34px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/30 via-blue-500/20 to-purple-500/30" />

                {/* Challenge Nodes */}
                <div className="relative space-y-0.5">
                  {section.challenges.map((challengeId, cIdx) => {
                    const challenge = CHALLENGES[challengeId]
                    const completed = isChallengeCompleted(challengeId)
                    const available = !locked && !completed
                    const isFirstAvailable = available &&
                      !isChallengeCompleted(section.challenges[cIdx - 1] || '') &&
                      (cIdx === 0 || isChallengeCompleted(section.challenges[cIdx - 1]))

                    return (
                      <button
                        key={challengeId}
                        onClick={() => handleNodeClick(section.id, idx, challengeId)}
                        disabled={locked || completed}
                        className="w-full text-left group relative"
                      >
                        <div className={`flex items-center gap-3 px-4 py-2.5 transition-all ${
                          completed
                            ? 'bg-emerald-500/5'
                            : locked
                              ? ''
                              : 'hover:bg-white/[0.04] cursor-pointer'
                        }`}>
                          {/* Node dot */}
                          <div className="relative shrink-0">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition-all ${
                              completed
                                ? 'bg-emerald-500 text-white'
                                : locked
                                  ? 'bg-gray-700/50 text-gray-500'
                                  : 'bg-cyan-500/20 text-cyan-400 ring-2 ring-cyan-500/40'
                            }`}>
                              {completed ? '✓' : locked ? '🔒' : cIdx + 1}
                            </div>
                            {available && (
                              <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                                className="absolute inset-0 w-5 h-5 rounded-full bg-cyan-400/20"
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium ${
                              completed ? 'text-emerald-400' : locked ? 'text-gray-500' : 'text-[var(--text-primary)]'
                            }`}>
                              {challenge?.title || challengeId}
                            </p>
                            <p className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">
                              {locked ? 'Bu bölümü açmak için önceki bölümü tamamla' : challenge?.description || ''}
                            </p>
                          </div>

                          {completed && <span className="text-emerald-400/60 text-[10px]">Tamamlandı</span>}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Boss Node */}
                <div className="border-t border-white/5">
                  <button
                    onClick={() => handleBossClick(section, idx)}
                    disabled={locked || !allChallengesDone || bossDone}
                    className="w-full text-left group"
                  >
                    <div className={`flex items-center gap-3 px-4 py-3 transition-all ${
                      bossDone
                        ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/5'
                        : locked || !allChallengesDone
                          ? ''
                          : 'hover:bg-white/[0.04] cursor-pointer'
                    }`}>
                      {/* Boss indicator */}
                      <div className={`relative shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-sm transition-all ${
                        bossDone
                          ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white'
                          : locked || !allChallengesDone
                            ? 'bg-gray-700/50 text-gray-500'
                            : 'bg-gradient-to-br from-amber-500/30 to-orange-500/20 text-amber-400 ring-2 ring-amber-500/40'
                      }`}>
                        {bossDone ? '👑' : locked ? '🔒' : '👹'}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold ${
                          bossDone ? 'text-amber-400' : locked || !allChallengesDone ? 'text-gray-500' : 'text-amber-300'
                        }`}>
                          {section.boss.name}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">
                          {locked
                            ? 'Önceki bölümü tamamla'
                            : !allChallengesDone
                              ? 'Tüm meydan okumaları tamamla'
                              : bossDone
                                ? 'Mağlup edildi!'
                                : section.boss.description}
                        </p>
                      </div>

                      {bossDone
                        ? <span className="text-emerald-400 text-[10px]">✅ Yenildi</span>
                        : allChallengesDone && !locked && !bossDone
                          ? <motion.span
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="text-amber-400 text-[10px]"
                            >
                              ⚔️ Savas!
                            </motion.span>
                          : null
                      }
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
