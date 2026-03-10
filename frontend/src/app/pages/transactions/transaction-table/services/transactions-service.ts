import {Injectable, signal} from '@angular/core';
import {Transaction} from './transactions-model';

@Injectable({
    providedIn: 'root',
})
export class TransactionsService {
    private transactionsData = signal<Transaction[]>([
        { id: '1', date: '2026-03-09', name: 'Coffee Shop', amount: 4.50, category: 'Food', transaction_status: 'COMPLETED', details: 'Daily latte' },
        { id: '2', date: '2026-03-10', name: 'Gym Membership', amount: 50.00, category: 'Health', transaction_status: 'UPCOMING', details: 'Monthly recurring' },
        { id: '3', date: '2026-02-19', name: 'Netflix', amount: 15.99, category: 'Entertainment', transaction_status: 'UPCOMING', details: 'Premium subscription' },
        { id: '4', date: '2026-02-11', name: 'Amazon', amount: 297.69, category: 'Shopping', transaction_status: 'COMPLETED', details: 'Office supplies' },
        { id: '5', date: '2026-02-11', name: 'Landlord', amount: 1200.00, category: 'Housing', transaction_status: 'UPCOMING', details: 'Monthly Rent' },
        { id: '6', date: '2026-03-10', name: 'Steam', amount: 59.99, category: 'Entertainment', transaction_status: 'UPCOMING', details: 'Game purchase' },
        { id: '7', date: '2026-02-17', name: 'Whole Foods', amount: 76.48, category: 'Food', transaction_status: 'COMPLETED', details: 'Groceries' },
        { id: '8', date: '2026-02-24', name: 'Home Depot', amount: 142.86, category: 'Shopping', transaction_status: 'COMPLETED', details: 'Renovation tools' },
        { id: '9', date: '2026-02-18', name: 'CVS Pharmacy', amount: 33.73, category: 'Health', transaction_status: 'UPCOMING', details: 'Prescriptions' },
        { id: '10', date: '2026-03-10', name: 'Apple Store', amount: 189.91, category: 'Shopping', transaction_status: 'COMPLETED', details: 'AirPods' },
        { id: '11', date: '2026-02-18', name: 'Shell Gas', amount: 45.78, category: 'Transport', transaction_status: 'COMPLETED', details: 'Fuel' },
        { id: '12', date: '2026-03-09', name: 'Electric Co', amount: 102.04, category: 'Utilities', transaction_status: 'COMPLETED', details: 'Monthly bill' },
        { id: '13', date: '2026-03-02', name: 'Airbnb', amount: 689.90, category: 'Travel', transaction_status: 'COMPLETED', details: 'Weekend trip' },
        { id: '14', date: '2026-02-28', name: 'Uber', amount: 19.25, category: 'Transport', transaction_status: 'UPCOMING', details: 'Ride to airport' },
        { id: '15', date: '2026-03-20', name: 'Planet Fitness', amount: 10.00, category: 'Health', transaction_status: 'COMPLETED', details: 'Membership fee' },
        { id: '16', date: '2026-02-22', name: 'Verizon', amount: 85.99, category: 'Utilities', transaction_status: 'COMPLETED', details: 'Phone plan' },
        { id: '17', date: '2026-02-27', name: 'Starbucks', amount: 6.25, category: 'Food', transaction_status: 'UPCOMING', details: 'Morning coffee' }
    ]);

    getTransactions() {
        return this.transactionsData.asReadonly();
    }
}
