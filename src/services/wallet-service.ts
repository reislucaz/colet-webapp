import { coletApi } from './axios'

export interface FeeDetail {
  amount: number
  application: string | null
  currency: string
  description: string
  type: string
}

export interface BalanceTransaction {
  id: string
  object: string
  amount: number
  available_on: number
  balance_type: string
  created: number
  currency: string
  description: string | null
  exchange_rate: number | null
  fee: number
  fee_details: FeeDetail[]
  net: number
  reporting_category: string
  source: string
  status: 'pending' | 'available'
  type: string
}

export interface SourceTypes {
  card: number
}

export interface BalanceAmount {
  amount: number
  currency: string
  source_types: SourceTypes
}

export interface Balance {
  available: BalanceAmount[]
  pending: BalanceAmount[]
}

export interface WalletData {
  balance: number
  totalSales: number
  totalPurchases: number
  pendingAmount: number
  availableAmount: number
  totalFees: number
}

export interface WalletStats {
  wallet: WalletData
  transactions: BalanceTransaction[]
  monthlyData: {
    month: string
    sales: number
    fees: number
    net: number
  }[]
}

export class WalletService {
  public static baseUrl = '/wallet'

  static async getWalletData(): Promise<WalletStats> {
    return (await coletApi.get(`${WalletService.baseUrl}`)).data
  }

  static async getTransactions(): Promise<BalanceTransaction[]> {
    return (await coletApi.get(`${WalletService.baseUrl}/transactions`)).data
  }

  static async getBalance(): Promise<Balance> {
    return (await coletApi.get(`${WalletService.baseUrl}`)).data
  }
}
