# Ads & In-App Purchase System — CodeCrafter

**Date:** 17 May 2026
**Status:** Approved Design

## Overview

Add Google Ads (rewarded video, banner, interstitial, native) and in-app purchases (remove ads, hearts, coins, VIP) to CodeCrafter. Works on **both web** (Google AdSense + Gumroad) and **mobile APK** (AdMob + Google Play Billing) via an abstraction layer.

## Currency System

| Unit | Earned From | Spent On |
|------|-------------|----------|
| **Coin** | Rewarded video (5), challenge (2), boss (10) | Hearts (2), hints (1), time bonus (2), skills (3-4) |
| **Heart** | Rewarded video (+1), coins (2 coin=1 heart), VIP (unlimited) | Wrong answer (-1), boss damage (-1) |
| **XP** | Challenges, bosses | Level progression |

### GameState Changes (`gameState.tsx`)

```typescript
interface GameProgress {
  // existing fields...
  coins: number
}
// New methods:
// addCoins(amount: number)
// spendCoins(amount: number): boolean
// buyHeartWithCoins(): boolean  // 2 coins -> +1 heart
```

## Ad Types & Placements

| Type | Where | Web | Mobile |
|------|-------|-----|--------|
| **Rewarded Video** | Boss "izle +1 heart", heart=0 "izle +2 heart", map "izle +5 coin", challenge "izle +3 coin" | AdSense rewarded | AdMob rewarded |
| **Banner** | Navbar alti (sticky) | AdSense banner | AdMob banner |
| **Interstitial** | Section gecerken, challenge basinda | AdSense interstitial | AdMob interstitial |
| **Native** | Challenge sonuc sayfasi, leaderboard alti | AdSense native | AdMob native |

### Rewarded Video Flow

```
Heart = 0
  -> "KALBIN KALMADI!" modal
     -> [Video Izle +1 Kalp] butonu
     -> AdService.showRewardedVideo()
     -> 30s reklam
     -> onReward: refillHearts(1), addCoins(2)
     -> Cody "Tebrikler" reaksiyonu
```

## In-App Purchase Products

| Product | Price | Web | Mobile | Effect |
|---------|-------|-----|--------|--------|
| **Remove Ads** | $4.99 | Gumroad | Play Billing | `adsEnabled = false` |
| **5 Hearts** | $0.99 | Gumroad | Play Billing | `hearts += 5` |
| **20 Hearts** | $2.99 | Gumroad | Play Billing | `hearts += 20` |
| **Unlimited Hearts** | $4.99 | Gumroad | Play Billing | `heartsUnlimited = true` |
| **100 Coins** | $0.99 | Gumroad | Play Billing | `coins += 100` |
| **500 Coins** | $2.99 | Gumroad | Play Billing | `coins += 500` |
| **VIP Monthly** | $3.99/mo | Gumroad/Stripe | Play sub | reklamsiz + unlimited heart + ozel Cody |

## Architecture

```
src/lib/ads/
  AdService.ts            // Interface: showRewardedVideo, showBanner, showInterstitial, showNative, hideAll
  WebAdService.ts         // Google AdSense / GPT implementation
  MobileAdService.ts      // AdMob via Capacitor plugin
  AdProvider.tsx           // Auto-detect platform, provide AdService via context

src/lib/purchases/
  PurchaseService.ts      // Interface: purchase(productId), restorePurchases(), isPurchased(productId)
  GumroadService.ts       // Gumroad license key + API (extends existing)
  PlayBillingService.ts   // Google Play Billing via Capacitor
  PurchaseProvider.tsx     // Auto-detect platform, provide PurchaseService

src/components/ads/
  BannerAd.tsx             // Sticky bottom banner (320x50), hidden if adsEnabled=false
  InterstitialAd.tsx       // Full-screen, shown on section transitions
  NativeAd.tsx             // In-content ad card
  RewardedVideoButton.tsx  // Reusable: "Reklam Izle +X" with onReward callback

src/components/shop/
  ShopScreen.tsx           // Full shop UI: coin packages, heart packages, remove ads, VIP
  CoinBalance.tsx          // Navbar coin display
  HeartBalance.tsx         // Navbar heart display (already exists, add coin-purchase option)
```

### Platform Detection

```typescript
function isMobileApp(): boolean {
  // Capacitor bridge exists only in native app
  return typeof window !== 'undefined' && 
    (window as any).Capacitor?.isNativePlatform?.()
}
```

### Banner Placement

- Always visible at bottom of screen (sticky)
- Hidden if `adsEnabled = false` (purchased remove ads)
- Hidden if `isVIP = true`
- 320x50 standard banner

### Rewarded Video Everywhere

Button component accepts:
- `rewardType: 'heart' | 'coin'`
- `rewardAmount: number`
- `onReward: () => void`

Used in:
- BossFight: "Video izle +1 Kalp" (right after taking damage)
- Map: "Video izle +5 Coin" (floating button)
- Challenge: "Video izle +3 Coin" (result screen)
- Heart=0 modal: "Video izle +2 Kalp" (when out of hearts)

## Implementation Phases

### Phase 1: Infrastructure
1. `src/lib/ads/` — AdService interface + WebAdService + MobileAdService
2. `src/lib/purchases/` — PurchaseService interface + GumroadService + PlayBillingService
3. Platform auto-detection + context providers

### Phase 2: Currency
1. `coins` in gameState + addCoins/spendCoins/buyHeartWithCoins
2. ShopScreen component (coin/heart packages, remove ads, VIP)
3. CoinBalance display in navbar

### Phase 3: Ads
1. RewardedVideoButton — reusable, every placement
2. BannerAd — sticky bottom
3. InterstitialAd — section transitions
4. NativeAd — result/leaderboard

### Phase 4: IAP
1. Gumroad multi-product support (hearts, coins, remove ads, VIP)
2. Play Billing on mobile
3. Receipt verification + state sync

### Phase 5: Polish
1. Ad-free mode (remove ads purchased)
2. VIP mode (all perks)
3. Edge cases: offline, ad load failure, rate limits

## Edge Cases

- **Ad block detected**: Show "Reklam Engelleyiciyi Kapat" mesaji, alternatif olarak IAP yonlendir
- **No internet**: Reklam yuklenemezse sessizce basarisiz ol, kullaniciya bildirim gosterme
- **Ad limit**: Gunluk reklam limiti (ornek 20 rewarded/gun), asilinca "Yarina Kadar Bekle"
- **Purchase restore**: Kullanici yeniden yuklerse satin alimlari geri yukle
- **Platform fallback**: Web'de AdMob yok -> otomatik AdSense; mobilde AdSense yok -> otomatik AdMob

## Non-Goals

- No Stripe implementation (Gumroad + Play Billing covers all)
- No custom ad server
- No analytics/ad attribution SDK
