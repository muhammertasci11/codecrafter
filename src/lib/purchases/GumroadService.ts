import { PurchaseService, ProductId, PRODUCTS } from './PurchaseService'

const PURCHASED_KEYS: Record<string, string> = {
  remove_ads: 'codecrafter_purchased_remove_ads',
  hearts_5: 'codecrafter_purchased_hearts_5',
  hearts_20: 'codecrafter_purchased_hearts_20',
  hearts_unlimited: 'codecrafter_purchased_hearts_unlimited',
  coins_100: 'codecrafter_purchased_coins_100',
  coins_500: 'codecrafter_purchased_coins_500',
  vip_monthly: 'codecrafter_purchased_vip',
}

export class GumroadService implements PurchaseService {
  async purchase(productId: ProductId, options?: import('./PurchaseService').PurchaseOptions): Promise<boolean> {
    if (options?.useAdRevenue) {
      return true
    }
    const res = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    })
    const data = await res.json()
    if (data.url) {
      window.open(data.url, '_blank')
      return true
    }
    return false
  }

  async restorePurchases(): Promise<ProductId[]> {
    const restored: ProductId[] = []
    for (const [id, key] of Object.entries(PURCHASED_KEYS)) {
      if (localStorage.getItem(key) === 'true') {
        restored.push(id as ProductId)
      }
    }
    return restored
  }

  async isPurchased(productId: ProductId): Promise<boolean> {
    return localStorage.getItem(PURCHASED_KEYS[productId]) === 'true'
  }

  markPurchased(productId: ProductId) {
    const key = PURCHASED_KEYS[productId]
    if (key) localStorage.setItem(key, 'true')
  }

  consume(productId: ProductId) {
    const key = PURCHASED_KEYS[productId]
    if (key) localStorage.removeItem(key)
  }
}
