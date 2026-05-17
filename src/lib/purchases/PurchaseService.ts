export type ProductId = 'remove_ads' | 'energy_5' | 'energy_20' | 'energy_unlimited' | 'coins_100' | 'coins_500' | 'vip_monthly'

export interface ProductInfo {
  id: ProductId
  name: string
  price: number
  currency: string
  description: string
}

export const PRODUCTS: Record<ProductId, ProductInfo> = {
  remove_ads: { id: 'remove_ads', name: 'Reklamlari Kaldir', price: 4.99, currency: 'USD', description: 'Tum reklamlari tek seferlik kaldir' },
  energy_5: { id: 'energy_5', name: '5 Enerji', price: 0.99, currency: 'USD', description: '5 enerji paketi' },
  energy_20: { id: 'energy_20', name: '20 Enerji', price: 2.99, currency: 'USD', description: '20 enerji paketi' },
  energy_unlimited: { id: 'energy_unlimited', name: 'Sinirsiz Enerji', price: 4.99, currency: 'USD', description: 'Sinirsiz enerji (7 gun)' },
  coins_100: { id: 'coins_100', name: '100 Coin', price: 0.99, currency: 'USD', description: '100 coin paketi' },
  coins_500: { id: 'coins_500', name: '500 Coin', price: 2.99, currency: 'USD', description: '500 coin paketi' },
  vip_monthly: { id: 'vip_monthly', name: 'VIP Aylik', price: 3.99, currency: 'USD', description: 'Reklamsiz + sinirsiz enerji + ozel Cody' },
}

export interface PurchaseOptions {
  useAdRevenue?: boolean
}

export interface PurchaseService {
  purchase(productId: ProductId, options?: PurchaseOptions): Promise<boolean>
  restorePurchases(): Promise<ProductId[]>
  isPurchased(productId: ProductId): Promise<boolean>
}

export type AdPlatform = 'web' | 'mobile'

export function detectPlatform(): AdPlatform {
  if (typeof window === 'undefined') return 'web'
  return (window as any).Capacitor?.isNativePlatform?.() ? 'mobile' : 'web'
}
