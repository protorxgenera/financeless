export type TransactionStatus = 'COMPLETED' | 'UPCOMING'

export interface Transaction {
    id: string
    date: string
    name: string
    amount: number
    currency: string
    category: string
    transaction_status: TransactionStatus
    details: string
}
