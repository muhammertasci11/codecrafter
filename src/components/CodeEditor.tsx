'use client'

import { useState, useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { motion } from 'framer-motion'
import { getChallenge } from '@/lib/gameData'
import { useGame } from '@/lib/gameState'
import { playComplete, playError } from '@/lib/audio'

type Language = 'javascript' | 'python' | 'java'

const sectionColors: Record<string, string> = {
  basics: 'from-blue-500 to-blue-700',
  loops: 'from-purple-500 to-purple-700',
  functions: 'from-red-500 to-red-700',
  arrays: 'from-green-500 to-green-700',
  objects: 'from-teal-500 to-teal-700',
  es6: 'from-pink-500 to-pink-700',
}

const sectionNames: Record<string, string> = {
  basics: 'Temeller', loops: 'Döngüler', functions: 'Fonksiyonlar',
  arrays: 'Diziler', objects: 'Nesneler', es6: 'ES6+',
}

export default function CodeEditor() {
  const game = useGame()
  const challenge = game.currentChallengeId ? getChallenge(game.currentChallengeId) : null
  const [code, setCode] = useState(challenge?.startingCode || '')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState<'idle' | 'running' | 'pass' | 'fail'>('idle')
  const [language, setLanguage] = useState<Language>('javascript')

  const handleEditorChange = useCallback((value: string | undefined) => {
    setCode(value || '')
  }, [])

  const runCode = async () => {
    if (!challenge) return
    setStatus('running')
    setOutput('')
    const endpoint = language === 'javascript' ? '/api/run' : `/api/run/${language}`
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, tests: challenge.tests }),
      })
      const data = await res.json()
      if (data.passed) {
        setOutput('✅ Tüm testler geçti!')
        setStatus('pass')
        playComplete()
        setTimeout(() => game.completeChallenge(challenge.id), 600)
      } else {
        setOutput(`❌ ${data.error || 'Test başarısız'}`)
        setStatus('fail')
        playError()
      }
    } catch {
      setOutput('⚠️ Bağlantı hatası')
      setStatus('fail')
      playError()
    }
  }

  const showHint = () => {
    if (challenge) setOutput(`💡 İpucu: ${challenge.hint}`)
  }

  if (!challenge) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4 sm:p-6"
    >
      <button
        onClick={() => game.setView('map')}
        className="mb-4 flex items-center gap-2 text-[#64748b] hover:text-white transition font-medium"
      >
        ⬅ Haritaya Dön
      </button>

      <div className="card p-6 mb-4">
        <div className="flex items-start gap-4 mb-3">
          <span className="text-3xl">📝</span>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">{challenge.title}</h2>
            <p className="text-[#94a3b8]">{challenge.description}</p>
          </div>
        </div>
        <span className={`inline-block bg-gradient-to-r ${sectionColors[challenge.section] || 'from-blue-500 to-blue-700'} text-white text-xs px-3 py-1 rounded-full font-medium`}>
          {sectionNames[challenge.section] || challenge.section}
        </span>
      </div>

      <div className="card overflow-hidden mb-4">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-indigo-500/10">
          <span className="text-xs text-[#64748b] font-mono">main.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'java'}</span>
        </div>
        <Editor
          height="280px"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={{ minimap: { enabled: false }, fontSize: 14, lineNumbers: 'on', scrollBeyondLastLine: false, automaticLayout: true, padding: { top: 12 } }}
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
          {(['javascript', 'python', 'java'] as Language[]).map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                language === lang ? 'bg-indigo-600 text-white shadow-lg' : 'text-[#64748b] hover:text-white'
              }`}
            >
              {lang === 'javascript' ? 'JS' : lang === 'python' ? 'Py' : 'Java'}
            </button>
          ))}
        </div>
        <button
          onClick={runCode}
          disabled={status === 'running'}
          className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50"
        >
          {status === 'running' ? '🔄 Çalıştırılıyor...' : '▶ Kodu Çalıştır'}
        </button>
        <button
          onClick={showHint}
          className="btn-secondary px-4 py-2.5 text-sm"
        >
          💡 İpucu
        </button>
      </div>

      {output && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${
            status === 'pass' ? 'bg-emerald-900/30 border-emerald-700/50 text-emerald-300' :
            status === 'fail' ? 'bg-red-900/30 border-red-700/50 text-red-300' :
            'bg-white/5 border-white/10 text-[#94a3b8]'
          }`}
        >
          <pre className="whitespace-pre-wrap font-mono text-sm">{output}</pre>
        </motion.div>
      )}
    </motion.div>
  )
}
