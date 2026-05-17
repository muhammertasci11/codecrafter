import { PurchaseService, ProductId } from './PurchaseService'

export class PlayBillingService implements PurchaseService {
  async purchase(productId: ProductId, options?: import('./PurchaseService').PurchaseOptions): Promise<boolean> {
    if (options?.useAdRevenue) {
      return true
    }
    try {
      const win = window as any
      if (win.GooglePlay?.Billing?.purchase) {
        await win.GooglePlay.Billing.purchase({ productId })
        return true
      }
      return false
    } catch { return false }
  }

  async restorePurchases(): Promise<ProductId[]> {
    try {
      const win = window as any
      if (win.GooglePlay?.Billing?.restore) {
        return await win.GooglePlay.Billing.restore()
      }
      return []
    } catch { return [] }
  }

  async isPurchased(productId: ProductId): Promise<boolean> {
    const restored = await this.restorePurchases()
    return restored.includes(productId)
  }
}
