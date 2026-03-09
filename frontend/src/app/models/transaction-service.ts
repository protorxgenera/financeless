import {Injectable} from '@angular/core';
import {Transaction} from './Transaction';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {

    transactions: Transaction[] = []

    constructor() {
        this.transactions.push({
            date: '2026-03-05',
            name: 'Spotify',
            amount: 12.24,
            category: 'utilities',
            transaction_status: 'Completed',
            details: ''
        })

        this.transactions.push({
            date: '2026-03-02',
            name: 'digi',
            amount: 66.53,
            category: 'utilities',
            transaction_status: 'Completed',
            details: ''
        })

        this.transactions.push({
            date: '2026-03-04',
            name: 'McDonalds',
            amount: 32.11,
            category: 'food',
            transaction_status: 'Completed',
            details: ''
        })

        this.transactions.push({
            date: '2026-03-08',
            name: 'Kaufland',
            amount: 73.21,
            category: 'groceries',
            transaction_status: 'Completed',
            details: ''
        })
    }

    retrieveAllTransactions() {
        return this.transactions
    }

}
