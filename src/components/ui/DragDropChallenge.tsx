'use client'

import { useState, useEffect } from 'react'
import { motion, Reorder } from 'framer-motion'
import type { DragDropPuzzle } from '@/lib/gameData'

interface DragDropChallengeProps {
  dragdrop: DragDropPuzzle
  onCorrect: () => void
  onWrong: () => void
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function DragDropChallenge({ dragdrop, onCorrect, onWrong }: DragDropChallengeProps) {
  const [items, setItems] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    setItems(shuffleArray(dragdrop.blocks))
    setSubmitted(false)
  }, [dragdrop])

  const handleSubmit = () => {
    if (submitted) return
    setSubmitted(true)
    const correct = items.every((item, i) => item === dragdrop.correctOrder[i])
    setIsCorrect(correct)
    setTimeout(() => {
      if (correct) onCorrect()
      else onWrong()
    }, 1000)
  }

  const correctCount = submitted
    ? items.filter((item, i) => item === dragdrop.correctOrder[i]).length
    : 0

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--text-secondary)]">
        Kod bloklarını doğru sıraya dizmek için sürükleyip bırak:
      </p>

      {submitted && (
        <div className={`p-3 rounded-[var(--radius-md)] border text-sm ${
          isCorrect
            ? 'bg-[var(--success)]/10 border-[var(--success)]/30 text-[var(--success)]'
            : 'bg-[var(--danger)]/10 border-[var(--danger)]/30 text-[var(--danger)]'
        }`}>
          {isCorrect
            ? '✅ Mükemmel! Tüm bloklar doğru sırada.'
            : `❌ ${correctCount}/${dragdrop.correctOrder.length} doğru. Doğru sıra: ${dragdrop.correctOrder.join(' ')}`
          }
        </div>
      )}

      {!submitted && (
        <>
          <Reorder.Group
            axis="y"
            values={items}
            onReorder={setItems}
            className="space-y-2"
          >
            {items.map((item, i) => (
              <Reorder.Item
                key={item}
                value={item}
                className="glass border border-[var(--glass-border)] rounded-[var(--radius-md)] px-4 py-3 cursor-grab active:cursor-grabbing flex items-center gap-3 hover:border-[var(--accent-blue)]/30 transition-colors"
                whileDrag={{
                  scale: 1.03,
                  boxShadow: '0 0 30px rgba(0,212,255,0.2)',
                }}
              >
                <span className="text-[var(--text-muted)] text-xs font-mono w-5 shrink-0 text-right">
                  {i + 1}.
                </span>
                <code className="text-sm font-mono text-[var(--text-primary)] flex-1">{item}</code>
                <span className="text-[var(--text-muted)] text-xs shrink-0">⠿</span>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <motion.button
            onClick={handleSubmit}
            className="btn-primary px-6 py-3 text-sm w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ✅ Sırayı Kontrol Et
          </motion.button>
        </>
      )}
    </div>
  )
}
