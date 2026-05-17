'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

function CodyRobot({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} fill="none">
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="35" y="30" width="50" height="55" rx="8" fill="url(#bodyGrad)" stroke="#00d4ff" strokeWidth="1.5" />
        <rect x="42" y="38" width="16" height="8" rx="2" fill="#00d4ff" className="animate-pulse-glow" />
        <rect x="62" y="38" width="16" height="8" rx="2" fill="#00d4ff" className="animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
        <rect x="51" y="52" width="18" height="4" rx="2" fill="#7c3aed" />
        <circle cx="42" cy="62" r="3" fill="#22d3ee" opacity="0.6" />
        <circle cx="78" cy="62" r="3" fill="#22d3ee" opacity="0.6" />
        <rect x="46" y="70" width="28" height="2" rx="1" fill="#ec4899" opacity="0.5" />
        <rect x="48" y="74" width="24" height="2" rx="1" fill="#ec4899" opacity="0.3" />
        <line x1="60" y1="15" x2="60" y2="30" stroke="#00d4ff" strokeWidth="2" />
        <circle cx="60" cy="12" r="4" fill="#00d4ff" className="animate-pulse-glow" />
        <rect x="30" y="25" width="8" height="2" rx="1" fill="#00d4ff" opacity="0.4" />
        <rect x="82" y="25" width="8" height="2" rx="1" fill="#00d4ff" opacity="0.4" />
      </motion.g>
      <defs>
        <linearGradient id="bodyGrad" x1="35" y1="30" x2="85" y2="85">
          <stop stopColor="#12122a" />
          <stop offset="1" stopColor="#1a1a3a" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const codeSnippets = [
  'const app = new CodeCrafter()',
  'function learn() { return "⚡" }',
  'let skills = ["JS","Py","Java"]',
  'boss.defeat() => xp += 100',
  'if (user.ready) { start() }',
  'await levelUp()',
]

const sections = [
  { id: 1, name: 'Temeller', gradient: 'from-[#00d4ff] to-[#22d3ee]', desc: 'Değişkenler, String, If-Else' },
  { id: 2, name: 'Döngüler', gradient: 'from-[#7c3aed] to-[#ec4899]', desc: 'For, While, Diziler' },
  { id: 3, name: 'Fonksiyonlar', gradient: 'from-[#ec4899] to-[#f59e0b]', desc: 'Fonksiyonlar, Callback, Algoritmalar' },
  { id: 4, name: 'Diziler', gradient: 'from-[#22d3ee] to-[#00d4ff]', desc: 'Map, Filter, Reduce' },
  { id: 5, name: 'Nesneler', gradient: 'from-[#f59e0b] to-[#7c3aed]', desc: 'Object, JSON, Validasyon' },
  { id: 6, name: 'ES6+', gradient: 'from-[#00d4ff] to-[#ec4899]', desc: 'Arrow, Destructuring, Class' },
]

export default function Home() {
  const router = useRouter()

  const handlePayment = async () => {
    try {
      const res = await fetch('/api/payment', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      router.push('/game?paid=true')
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-300px] left-[-300px] w-[800px] h-[800px] bg-[#00d4ff]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-300px] right-[-300px] w-[700px] h-[700px] bg-[#7c3aed]/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#22d3ee]/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden h-[400px]">
            {codeSnippets.map((code, i) => (
              <motion.div
                key={i}
                className="absolute text-xs md:text-sm font-mono text-[var(--text-muted)]/20 select-none"
                style={{
                  left: `${15 + (i % 3) * 30}%`,
                  top: `${20 + i * 12}%`,
                }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={{
                  opacity: [0.15, 0.3, 0.15],
                  x: i % 2 === 0 ? [0, 20, 0] : [0, -20, 0],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'linear',
                }}
              >
                {code}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2, damping: 15 }}
            className="relative inline-block mb-4"
          >
            <CodyRobot className="w-28 h-32 mx-auto" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="glow-text">CodeCrafter</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[var(--text-secondary)] mb-3 max-w-2xl mx-auto font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Learn to Code, Defeat the Bugs
          </motion.p>

          <motion.p
            className="text-sm text-[var(--text-muted)] mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            6 bölüm, 18 challenge, 6 boss ile programlamayı RPG oynayarak öğren
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              onClick={handlePayment}
              className="btn-primary px-8 py-4 text-base flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span>🚀</span>
              <span className="relative z-10">OYUNU SATIN AL — $9.99</span>
            </motion.button>
            <motion.button
              onClick={() => router.push('/game')}
              className="btn-secondary px-8 py-4 text-base flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span>🎮</span>
              <span>Demo Oyna (3 Challenge)</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid md:grid-cols-3 gap-5 mb-20"
        >
          {[
            { icon: '🗺️', title: 'RPG Haritası', desc: 'Node\'lar arasında ilerle, her biri yeni bir kod challenge\'ı', gradient: 'from-[#00d4ff]/10 to-[#7c3aed]/10', border: 'border-[#00d4ff]/20' },
            { icon: '⚔️', title: 'Boss Savaşları', desc: '3 aşamalı boss\'ları yenerek yeni bölümler aç', gradient: 'from-[#7c3aed]/10 to-[#ec4899]/10', border: 'border-[#7c3aed]/20' },
            { icon: '⭐', title: 'Yetenek Ağacı', desc: 'Kazandığın puanlarla güçlü yetenekler satın al', gradient: 'from-[#22d3ee]/10 to-[#00d4ff]/10', border: 'border-[#22d3ee]/20' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className={`rounded-[var(--radius-lg)] p-6 sm:p-8 text-center bg-gradient-to-br ${item.gradient} border ${item.border} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <motion.span
                className="text-4xl mb-4 block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {item.icon}
              </motion.span>
              <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">{item.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="glass rounded-[var(--radius-xl)] p-6 sm:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-8 text-center">
            <span className="glow-text">6 Bölüm · 18 Challenge · 6 Boss</span>
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sections.map((s, i) => (
              <motion.div
                key={s.id}
                className="flex items-center gap-4 p-4 rounded-[var(--radius-md)] bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + i * 0.08 }}
              >
                <span className={`bg-gradient-to-br ${s.gradient} text-white px-3 py-1.5 rounded-lg text-sm font-bold shrink-0 shadow-lg`}>
                  {s.id}
                </span>
                <div>
                  <span className="text-[var(--text-primary)] font-medium text-sm">{s.name}</span>
                  <p className="text-[var(--text-muted)] text-xs mt-0.5">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.footer
          className="mt-16 text-center text-xs text-[var(--text-muted)] pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          CodeCrafter v3 · Made with Cody 🤖
        </motion.footer>
      </div>
    </div>
  )
}
