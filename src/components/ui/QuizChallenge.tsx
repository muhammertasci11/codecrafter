'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { QuizQuestion } from '@/lib/gameData'

interface QuizChallengeProps {
  quiz: QuizQuestion
  onCorrect: () => void
  onWrong: () => void
}

export default function QuizChallenge({ quiz, onCorrect, onWrong }: QuizChallengeProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    const correct = index === quiz.correctIndex
    setIsCorrect(correct)
    setTimeout(() => {
      if (correct) onCorrect()
      else onWrong()
    }, 1200)
  }

  return (
    <div className="space-y-4">
      <p className="text-base sm:text-lg text-[var(--text-primary)] font-medium leading-relaxed">
        {quiz.question}
      </p>

      <div className="space-y-3">
        {quiz.options.map((option, i) => {
          const isSelected = selected === i
          const isAnswer = i === quiz.correctIndex
          let bg = 'glass hover:bg-white/[0.08] cursor-pointer'
          let border = 'border-[var(--glass-border)]'

          if (answered) {
            if (isAnswer) {
              bg = 'bg-[var(--success)]/20'
              border = 'border-[var(--success)]'
            } else if (isSelected && !isAnswer) {
              bg = 'bg-[var(--danger)]/20'
              border = 'border-[var(--danger)]'
            }
          } else if (isSelected) {
            bg = 'bg-[var(--accent-blue)]/15'
            border = 'border-[var(--accent-blue)]/40'
          }

          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left p-4 rounded-[var(--radius-md)] border transition-all ${bg} ${border} ${answered ? 'cursor-default' : ''}`}
              whileHover={answered ? {} : { scale: 1.02, x: 4 }}
              whileTap={answered ? {} : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex items-start gap-3">
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                  answered && isAnswer ? 'bg-[var(--success)] text-white border-[var(--success)]' :
                  answered && isSelected && !isAnswer ? 'bg-[var(--danger)] text-white border-[var(--danger)]' :
                  isSelected ? 'bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]' :
                  'border-[var(--text-muted)] text-[var(--text-muted)]'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm sm:text-base text-[var(--text-primary)]">{option}</span>
                {answered && isAnswer && <span className="ml-auto text-[var(--success)] shrink-0">✓</span>}
                {answered && isSelected && !isAnswer && <span className="ml-auto text-[var(--danger)] shrink-0">✕</span>}
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-[var(--radius-md)] border ${
              isCorrect
                ? 'bg-[var(--success)]/10 border-[var(--success)]/30'
                : 'bg-[var(--danger)]/10 border-[var(--danger)]/30'
            }`}
          >
            <p className={`text-sm ${isCorrect ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
              {isCorrect ? '✅ Doğru!' : '❌ Yanlış!'}
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">{quiz.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
