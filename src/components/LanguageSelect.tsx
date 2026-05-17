'use client'

import { motion } from 'framer-motion'
import { useGame, ALL_LANGUAGES, LANG_CATEGORIES, type Language } from '@/lib/gameState'
import { UI_LANG_META, UI_TRANSLATIONS } from '@/lib/i18n'

export default function LanguageSelect({ onComplete }: { onComplete?: () => void }) {
  const game = useGame()
  const ul = game.uiLanguage
  const t = UI_TRANSLATIONS[ul]

  const handleSelect = (lang: Language) => {
    game.setLanguage(lang)
    if (onComplete) onComplete()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto p-4 sm:p-6"
    >
      <div className="glass rounded-[var(--radius-xl)] p-6 sm:p-8 text-center mb-6">
        <motion.span
          className="text-5xl block mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🤖
        </motion.span>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          <span className="glow-text">{t.title}</span>
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          {t.desc}
          <br />
          <span className="text-[var(--text-muted)] text-xs">{t.note}</span>
        </p>
      </div>

      <div className="mb-6">
        <p className="text-xs text-[var(--text-muted)] mb-2 text-center">{t.uiLang}</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin justify-center flex-wrap">
          {UI_LANG_META.map(l => (
            <button
              key={l.id}
              onClick={() => game.setUiLanguage(l.id as any)}
              className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
                ul === l.id
                  ? 'bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] border-[var(--accent-blue)]/30'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)] hover:border-[var(--glass-border)]'
              }`}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-[var(--text-muted)] mb-3">{t.select}</p>

      <div className="space-y-5">
        {LANG_CATEGORIES.map((cat) => (
          <div key={cat.label}>
            <div className="flex items-center gap-2 mb-2">
              <span>{cat.icon}</span>
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                {ul === 'tr' ? cat.label : cat.labelEn}
              </span>
              <div className="flex-1 h-px bg-[var(--glass-border)]" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {cat.langIds.map((id) => {
                const lang = ALL_LANGUAGES.find(l => l.id === id)!
                const isActive = game.preferredLanguage === id
                return (
                  <motion.button
                    key={id}
                    onClick={() => handleSelect(id)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all min-w-[80px] ${
                      isActive
                        ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/10'
                        : 'border-[var(--glass-border)] glass hover:border-[var(--text-muted)]/30'
                    }`}
                  >
                    <span className="text-2xl">{lang.icon}</span>
                    <span className={`text-[10px] font-medium whitespace-nowrap ${
                      isActive ? 'text-[var(--accent-blue)]' : 'text-[var(--text-secondary)]'
                    }`}>
                      {lang.name}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
