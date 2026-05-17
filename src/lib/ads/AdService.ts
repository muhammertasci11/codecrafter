export interface AdService {
  showRewardedVideo(onReward: () => void, onError?: () => void): void
  showBanner(containerId: string): void
  hideBanner(): void
  showInterstitial(onClose?: () => void): void
  showNative(containerId: string): void
  isAdBlocked(): Promise<boolean>
}

export type AdPlatform = 'web' | 'mobile'

export function detectPlatform(): AdPlatform {
  if (typeof window === 'undefined') return 'web'
  return (window as any).Capacitor?.isNativePlatform?.() ? 'mobile' : 'web'
}
