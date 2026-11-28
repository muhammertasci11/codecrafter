import { AdService } from './AdService'

function adBlockCheck(): Promise<boolean> {
  return new Promise(resolve => {
    const test = document.createElement('div')
    test.innerHTML = '&nbsp;'
    test.className = 'adsbox'
    test.style.position = 'absolute'
    test.style.top = '-999px'
    document.body.appendChild(test)
    setTimeout(() => {
      resolve(test.offsetHeight === 0)
      test.remove()
    }, 100)
  })
}

let adSenseLoaded = false
function loadAdSense(clientId: string): Promise<void> {
  return new Promise((resolve) => {
    if (adSenseLoaded) { resolve(); return }
    if (typeof (window as any).adsbygoogle !== 'undefined') {
      adSenseLoaded = true
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`
    script.async = true
    script.crossOrigin = 'anonymous'
    script.onload = () => { adSenseLoaded = true; resolve() }
    script.onerror = () => resolve()
    document.head.appendChild(script)
  })
}

function pushAd() {
  try {
    const win = window as any
    win.adsbygoogle = win.adsbygoogle || []
    win.adsbygoogle.push({})
  } catch {}
}

export class WebAdService implements AdService {
  private clientId: string
  private autoAds: boolean
  private slotMap: Record<string, string>
  private adCount: number = 0
  private maxDailyAds: number = 20
  private scriptLoaded: boolean = false

  constructor() {
    this.clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ''
    this.autoAds = process.env.NEXT_PUBLIC_ADSENSE_AUTO_ADS === 'true'
    this.slotMap = {
      banner: process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT || '',
      interstitial: process.env.NEXT_PUBLIC_ADSENSE_INTERSTITIAL_SLOT || '',
      native: process.env.NEXT_PUBLIC_ADSENSE_NATIVE_SLOT || '',
    }
    this.adCount = parseInt(localStorage.getItem('cc_ad_count') || '0', 10)
    this.init()
  }

  private async init() {
    if (!this.clientId) return
    await loadAdSense(this.clientId)
    this.scriptLoaded = true
  }

  private canAd(): boolean {
    const today = new Date().toISOString().split('T')[0]
    const stored = localStorage.getItem('cc_ad_date')
    if (stored !== today) {
      this.adCount = 0
      localStorage.setItem('cc_ad_date', today)
    }
    return this.adCount < this.maxDailyAds
  }

  private bump() {
    this.adCount++
    localStorage.setItem('cc_ad_count', String(this.adCount))
  }

  private hasSlot(type: string): boolean {
    return !!this.slotMap[type]
  }

  showRewardedVideo(onReward: () => void, onError?: () => void): void {
    if (!this.clientId || !this.canAd()) { onError?.(); return }

    const overlay = document.createElement('div')
    overlay.id = 'cc-rewarded-ad'
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99999;
      background:rgba(0,0,0,0.8);
      display:flex;align-items:center;justify-content:center;
    `

    const card = document.createElement('div')
    card.style.cssText = `
      background:#1a1a2e;border:1px solid rgba(0,212,255,0.3);
      border-radius:16px;padding:24px;position:relative;
      width:340px;max-width:90vw;text-align:center;
    `

    const closeBtn = document.createElement('button')
    closeBtn.innerHTML = '✕'
    closeBtn.style.cssText = `
      position:absolute;top:8px;right:12px;
      background:none;border:none;color:#64748b;
      cursor:pointer;font-size:20px;
    `
    closeBtn.onclick = () => { overlay.remove(); onError?.() }
    card.appendChild(closeBtn)

    const timer = document.createElement('div')
    timer.style.cssText = 'color:#94a3b8;font-size:12px;margin-bottom:12px;'
    timer.textContent = 'Reklam yükleniyor...'
    card.appendChild(timer)

    const adSlot = document.createElement('div')
    adSlot.id = 'cc-rewarded-slot'
    adSlot.style.cssText = 'width:300px;height:250px;margin:0 auto;'

    if (this.hasSlot('banner')) {
      const ins = document.createElement('ins')
      ins.className = 'adsbygoogle'
      ins.style.cssText = 'display:inline-block;width:300px;height:250px;'
      ins.setAttribute('data-ad-client', this.clientId)
      ins.setAttribute('data-ad-slot', this.slotMap.banner)
      adSlot.appendChild(ins)
    }
    card.appendChild(adSlot)
    overlay.appendChild(card)
    document.body.appendChild(overlay)

    pushAd()
    this.bump()

    let remaining = 15
    timer.textContent = `${remaining}s sonra odul kazanacaksiniz`

    const interval = setInterval(() => {
      remaining--
      timer.textContent = `${remaining}s sonra odul kazanacaksiniz`
      if (remaining <= 0) {
        clearInterval(interval)
        overlay.remove()
        onReward()
      }
    }, 1000)
  }

  showBanner(containerId: string): void {
    if (!this.clientId || !this.hasSlot('banner')) return
    const container = document.getElementById(containerId)
    if (!container) return
    container.innerHTML = ''
    const ins = document.createElement('ins')
    ins.className = 'adsbygoogle'
    ins.style.cssText = 'display:inline-block;width:320px;height:50px;'
    ins.setAttribute('data-ad-client', this.clientId)
    ins.setAttribute('data-ad-slot', this.slotMap.banner)
    container.appendChild(ins)
    pushAd()
  }

  hideBanner(): void {
    const el = document.querySelector('[id^="banner-ad-container"]')
    if (el) el.innerHTML = ''
  }

  showInterstitial(onClose?: () => void): void {
    if (!this.clientId || !this.canAd()) { onClose?.(); return }
    const overlay = document.createElement('div')
    overlay.id = 'cc-interstitial-ad'
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99998;
      background:rgba(0,0,0,0.85);
      display:flex;align-items:center;justify-content:center;
    `
    const adContainer = document.createElement('div')
    adContainer.style.cssText = 'width:320px;height:480px;'

    if (this.hasSlot('interstitial')) {
      const ins = document.createElement('ins')
      ins.className = 'adsbygoogle'
      ins.style.cssText = 'display:inline-block;width:320px;height:480px;'
      ins.setAttribute('data-ad-client', this.clientId)
      ins.setAttribute('data-ad-slot', this.slotMap.interstitial)
      adContainer.appendChild(ins)
    }
    overlay.appendChild(adContainer)
    document.body.appendChild(overlay)
    pushAd()
    this.bump()
    setTimeout(() => { overlay.remove(); onClose?.() }, 5000)
  }

  showNative(containerId: string): void {
    if (!this.clientId || !this.hasSlot('native')) return
    const container = document.getElementById(containerId)
    if (!container) return
    container.innerHTML = ''
    const ins = document.createElement('ins')
    ins.className = 'adsbygoogle'
    ins.style.cssText = 'display:block'
    ins.setAttribute('data-ad-client', this.clientId)
    ins.setAttribute('data-ad-slot', this.slotMap.native)
    ins.setAttribute('data-ad-format', 'native')
    container.appendChild(ins)
    pushAd()
  }

  isAdBlocked(): Promise<boolean> {
    return adBlockCheck()
  }
}
