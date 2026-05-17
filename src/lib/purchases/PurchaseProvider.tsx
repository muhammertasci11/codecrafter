'use client'

import { createContext, useContext, ReactNode, useRef, useEffect, useState } from 'react'
import { PurchaseService, detectPlatform } from './PurchaseService'
import { GumroadService } from './GumroadService'
import { PlayBillingService } from './PlayBillingService'

interface PlatformInfo {
  platform: 'web' | 'mobile'
}

const PurchaseContext = createContext<PurchaseService | null>(null)
const PlatformContext = createContext<PlatformInfo>({ platform: 'web' })

export function PurchaseProvider({ children }: { children: ReactNode }) {
  const serviceRef = useRef<PurchaseService | null>(null)
  const [ready, setReady] = useState(false)
  const [platform, setPlatform] = useState<'web' | 'mobile'>('web')

  useEffect(() => {
    const detected = (typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform?.()) ? 'mobile' : 'web'
    setPlatform(detected)
    serviceRef.current = detected === 'mobile' ? new PlayBillingService() : new GumroadService()
    setReady(true)
  }, [])

  return (
    <PlatformContext.Provider value={{ platform }}>
      <PurchaseContext.Provider value={serviceRef.current}>
        {ready ? children : <div className="min-h-screen bg-[var(--bg-primary)]" />}
      </PurchaseContext.Provider>
    </PlatformContext.Provider>
  )
}

export function usePurchaseService(): PurchaseService {
  const ctx = useContext(PurchaseContext)
  if (!ctx) throw new Error('usePurchaseService must be used within PurchaseProvider')
  return ctx
}

export function usePlatform(): PlatformInfo {
  return useContext(PlatformContext)
}
