export type ProductId = 'remove_ads' | 'hearts_5' | 'hearts_20' | 'hearts_unlimited' | 'coins_100' | 'coins_500' | 'vip_monthly'

export interface ProductInfo {
  id: ProductId
  name: string
  price: number
  currency: string
  description: string
}

export const PRODUCTS: Record<ProductId, ProductInfo> = {
  remove_ads: { id: 'remove_ads', name: 'Reklamlari Kaldir', price: 4.99, currency: 'USD', description: 'Tum reklamlari tek seferlik kaldir' },
  hearts_5: { id: 'hearts_5', name: '5 Kalp', price: 0.99, currency: 'USD', description: '5 kalp paketi' },
  hearts_20: { id: 'hearts_20', name: '20 Kalp', price: 2.99, currency: 'USD', description: '20 kalp paketi' },
  hearts_unlimited: { id: 'hearts_unlimited', name: 'Sinirsiz Kalp', price: 4.99, currency: 'USD', description: 'Sinirsiz kalp (7 gun)' },
  coins_100: { id: 'coins_100', name: '100 Coin', price: 0.99, currency: 'USD', description: '100 coin paketi' },
  coins_500: { id: 'coins_500', name: '500 Coin', price: 2.99, currency: 'USD', description: '500 coin paketi' },
  vip_monthly: { id: 'vip_monthly', name: 'VIP Aylik', price: 3.99, currency: 'USD', description: 'Reklamsiz + sinirsiz kalp + ozel Cody' },
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
