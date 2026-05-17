import { useState, useEffect } from 'react'
import { StoryNode } from '@/lib/gameData'

export default function StoryDialog({ story, onComplete }: { story: StoryNode, onComplete: () => void }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const currentLine = story.content[currentLineIndex]

  useEffect(() => {
    setIsTyping(true)
    setDisplayedText('')
    let charIndex = 0
    const interval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setDisplayedText(prev => prev + currentLine[charIndex])
        charIndex++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 40) // 40ms per char

    return () => clearInterval(interval)
  }, [currentLine, currentLineIndex])

  const handleNext = () => {
    if (isTyping) {
      // Skip typing
      setIsTyping(false)
      setDisplayedText(currentLine)
    } else {
      if (currentLineIndex < story.content.length - 1) {
        setCurrentLineIndex(i => i + 1)
      } else {
        onComplete()
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-8 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={handleNext}>
      <div 
        className="w-full max-w-2xl bg-[var(--bg-secondary)] border-2 border-[var(--accent-blue)] rounded-xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.2)] cursor-pointer translate-y-0 animate-in slide-in-from-bottom-10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
          <div className="w-10 h-10 rounded-full bg-[var(--accent-blue)]/20 flex items-center justify-center text-xl shadow-[0_0_15px_var(--accent-blue)]">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-white text-lg tracking-wide">{story.title}</h3>
            <span className="text-xs text-[var(--accent-blue)] uppercase tracking-wider font-mono">Sistem Mesajı</span>
          </div>
        </div>
        
        <div className="min-h-[80px] text-[var(--text-primary)] text-lg leading-relaxed font-medium">
          {displayedText}
          {isTyping && <span className="animate-pulse inline-block w-2 h-5 ml-1 bg-[var(--accent-blue)] align-middle"></span>}
        </div>

        <div className="mt-4 flex justify-end">
          <button 
            className="text-sm font-mono text-white/50 hover:text-white transition-colors flex items-center gap-2"
            onClick={handleNext}
          >
            {isTyping ? 'Geç (Boşluk/Tıkla)' : currentLineIndex < story.content.length - 1 ? 'Devam (Boşluk/Tıkla) →' : 'Kapat (Boşluk/Tıkla) ✓'}
          </button>
        </div>
      </div>
    </div>
  )
}
