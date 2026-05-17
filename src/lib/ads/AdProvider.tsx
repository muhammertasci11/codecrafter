'use client'

import { createContext, useContext, ReactNode, useRef, useEffect, useState } from 'react'
import { AdService, detectPlatform } from './AdService'
import { WebAdService } from './WebAdService'
import { MobileAdService } from './MobileAdService'

const AdContext = createContext<AdService | null>(null)

export function AdProvider({ children }: { children: ReactNode }) {
  const serviceRef = useRef<AdService | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const platform = detectPlatform()
    serviceRef.current = platform === 'mobile' ? new MobileAdService() : new WebAdService()
    setReady(true)
  }, [])

  return (
    <AdContext.Provider value={serviceRef.current}>
      {ready ? children : <div className="min-h-screen bg-[var(--bg-primary)]" />}
    </AdContext.Provider>
  )
}

export function useAdService(): AdService {
  const ctx = useContext(AdContext)
  if (!ctx) throw new Error('useAdService must be used within AdProvider')
  return ctx
}
