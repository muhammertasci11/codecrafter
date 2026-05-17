'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '@/lib/gameState'

export default function PaymentScreen() {
  const game = useGame()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [licenseKey, setLicenseKey] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [showLicenseInput, setShowLicenseInput] = useState(false)

  const handleGumroadPurchase = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/payment', { method: 'POST' })
      const data = await res.json()
      if (data.url) { window.location.href = data.url }
      else { setError(data.error || 'Ödeme başlatılamadı.') }
    } catch {
      setError('Bir hata oluştu.')
    } finally { setLoading(false) }
  }

  const handleLicenseVerify = async () => {
    if (!licenseKey.trim()) return
    setVerifying(true)
    setError('')
    try {
      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: licenseKey.trim() }),
      })
      const data = await res.json()
      if (data.valid && !data.purchase?.refunded) {
        game.setPaid(true)
        game.setView('map')
      } else {
        setError(data.error || 'Geçersiz lisans anahtarı')
      }
    } catch {
      setError('Doğrulama hatası')
    } finally { setVerifying(false) }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-4 sm:p-6"
    >
      <div className="card p-8 relative overflow-hidden text-center">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <motion.span
            className="text-6xl mb-4 block"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔓
          </motion.span>
          <h2 className="text-3xl font-extrabold mb-2"><span className="glow-text">Tam Sürümü Aç</span></h2>
          <p className="text-[#94a3b8] mb-6">
            6 bölüm, 18 Challenge, 6 Boss savaşı ve Yetenek Ağacı. Öğrenme maceranı sınırsız kıl!
          </p>

          <div className="card p-4 mb-6 flex items-center justify-between bg-indigo-900/20 border-indigo-500/20">
            <div className="text-left">
              <span className="text-sm text-[#94a3b8] block font-medium">Fiyat</span>
              <span className="text-2xl font-bold text-white">$9.99</span>
            </div>
            <span className="bg-indigo-500/20 text-indigo-400 text-xs px-3 py-1 rounded-full font-bold border border-indigo-500/30">
              Ömür Boyu Erişim
            </span>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700/50 text-red-300 text-sm p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <button onClick={handleGumroadPurchase} disabled={loading} className="btn-primary w-full py-4 text-base disabled:opacity-50">
            {loading ? '🔄 Yönlendiriliyor...' : '💳 Gumroad ile Satın Al'}
          </button>

          <button
            onClick={() => setShowLicenseInput(!showLicenseInput)}
            className="w-full mt-3 text-[#64748b] hover:text-white transition text-sm"
          >
            {showLicenseInput ? 'Gizle' : 'Zaten satın aldıysan lisans anahtarını gir'}
          </button>

          <AnimatePresence>
            {showLicenseInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Lisans anahtarı"
                    value={licenseKey}
                    onChange={e => setLicenseKey(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-[#64748b] focus:border-indigo-500/50 outline-none text-sm"
                  />
                  <button onClick={handleLicenseVerify} disabled={verifying} className="btn-primary px-4 py-2.5 text-sm disabled:opacity-50 shrink-0">
                    {verifying ? '🔄' : 'Doğrula'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button onClick={() => game.setView('map')} className="w-full mt-4 text-[#64748b] hover:text-white transition text-sm font-medium">
            ← Haritaya Dön (Demo Modu)
          </button>
        </div>
      </div>
    </motion.div>
  )
}
