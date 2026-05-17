import { AdService } from './AdService'

export class MobileAdService implements AdService {
  showRewardedVideo(onReward: () => void, onError?: () => void): void {
    try {
      const win = window as any
      if (win.AdMob?.rewardedVideo?.load) {
        win.AdMob.rewardedVideo.load({
          id: process.env.NEXT_PUBLIC_ADMOB_REWARDED_ID || 'ca-app-pub-xxxxxxxx/xxxxxxxxx',
        })
        win.AdMob.rewardedVideo.show()
        win.AdMob.rewardedVideo.addEventListener('onRewardedVideoCompleted', () => {
          onReward()
        })
      } else {
        onError?.()
      }
    } catch { onError?.() }
  }

  showBanner(containerId: string): void {
    try {
      const win = window as any
      if (win.AdMob?.banner?.show) {
        win.AdMob.banner.show({
          id: process.env.NEXT_PUBLIC_ADMOB_BANNER_ID || 'ca-app-pub-xxxxxxxx/xxxxxxxxx',
          position: 'bottom',
        })
      }
    } catch {}
  }

  hideBanner(): void {
    try {
      const win = window as any
      win.AdMob?.banner?.hide?.()
    } catch {}
  }

  showInterstitial(onClose?: () => void): void {
    try {
      const win = window as any
      if (win.AdMob?.interstitial?.load) {
        win.AdMob.interstitial.load({
          id: process.env.NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID || 'ca-app-pub-xxxxxxxx/xxxxxxxxx',
        })
        win.AdMob.interstitial.show()
        setTimeout(() => onClose?.(), 5000)
      } else { onClose?.() }
    } catch { onClose?.() }
  }

  showNative(containerId: string): void {
    try {
      const win = window as any
      if (win.AdMob?.native?.show) {
        win.AdMob.native.show({
          id: process.env.NEXT_PUBLIC_ADMOB_NATIVE_ID || 'ca-app-pub-xxxxxxxx/xxxxxxxxx',
          parent: containerId,
        })
      }
    } catch {}
  }

  async isAdBlocked(): Promise<boolean> {
    return false
  }
}
