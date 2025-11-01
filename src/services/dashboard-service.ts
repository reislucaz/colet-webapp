import { Order } from '../@types/order'
import { Product } from '../@types/product'
import { OrderService } from './order-service'
import { WalletService } from './wallet-service'

export interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalSales: number
  pendingOrders: number
  recentOrders: Order[]
  topProducts: Product[]
}

export class DashboardService {
  static async getStats(): Promise<DashboardStats> {
    const [orders, walletData] = await Promise.all([
      OrderService.getManyByUserId(''),
      WalletService.getWalletData(),
    ])

    const pendingOrders = orders.filter(
      (order) => order.status.toLowerCase() === 'pending',
    ).length

    const recentOrders = orders
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5)

    const productSales = new Map<string, { product: Product; count: number }>()
    orders.forEach((order) => {
      const existing = productSales.get(order.product.id)
      if (existing) {
        existing.count++
      } else {
        productSales.set(order.product.id, { product: order.product, count: 1 })
      }
    })

    const topProducts = Array.from(productSales.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((item) => item.product)

    return {
      totalProducts: topProducts.length,
      totalOrders: orders.length,
      totalSales: walletData.wallet?.totalSales || 0,
      pendingOrders,
      recentOrders,
      topProducts,
    }
  }
}
