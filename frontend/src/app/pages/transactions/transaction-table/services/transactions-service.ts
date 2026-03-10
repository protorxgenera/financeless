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
        { id: '17', date: '2026-02-27', name: 'Starbucks', amount: 6.25, category: 'Food', transaction_status: 'UPCOMING', details: 'Morning coffee' },
        { id: '18', date: '2026-03-01', name: 'Lidl', amount: 42.30, category: 'Food', transaction_status: 'COMPLETED', details: 'Weekly groceries' },
        { id: '19', date: '2026-03-02', name: 'Deutsche Bahn', amount: 89.00, category: 'Transport', transaction_status: 'COMPLETED', details: 'ICE Berlin to Munich' },
        { id: '20', date: '2026-03-03', name: 'Zalando', amount: 124.95, category: 'Shopping', transaction_status: 'COMPLETED', details: 'New sneakers' },
        { id: '21', date: '2026-03-04', name: 'Rewe', amount: 15.20, category: 'Food', transaction_status: 'COMPLETED', details: 'Lunch break' },
        { id: '22', date: '2026-03-05', name: 'Tado GmbH', amount: 12.00, category: 'Utilities', transaction_status: 'UPCOMING', details: 'Smart heating sub' },
        { id: '23', date: '2026-03-05', name: 'H&M', amount: 35.99, category: 'Shopping', transaction_status: 'COMPLETED', details: 'Cotton shirts' },
        { id: '24', date: '2026-03-06', name: 'Decathlon', amount: 78.50, category: 'Health', transaction_status: 'COMPLETED', details: 'Camping gear' },
        { id: '25', date: '2026-03-06', name: 'EasyJet', amount: 145.00, category: 'Travel', transaction_status: 'UPCOMING', details: 'Flight to Mallorca' },
        { id: '26', date: '2026-03-07', name: 'IKEA', amount: 210.00, category: 'Housing', transaction_status: 'COMPLETED', details: 'Bookshelf' },
        { id: '27', date: '2026-03-07', name: 'Spotify AB', amount: 10.99, category: 'Entertainment', transaction_status: 'COMPLETED', details: 'Monthly Premium' },
        { id: '28', date: '2026-03-08', name: 'Bauhaus', amount: 55.40, category: 'Housing', transaction_status: 'COMPLETED', details: 'Garden plants' },
        { id: '29', date: '2026-03-08', name: 'Bolt', amount: 12.50, category: 'Transport', transaction_status: 'COMPLETED', details: 'Scooter ride' },
        { id: '30', date: '2026-03-09', name: 'Aldi Süd', amount: 67.80, category: 'Food', transaction_status: 'COMPLETED', details: 'Weekly stock up' },
        { id: '31', date: '2026-03-09', name: 'MediaMarkt', amount: 499.00, category: 'Shopping', transaction_status: 'UPCOMING', details: 'PlayStation 5' },
        { id: '32', date: '2026-03-10', name: 'Deliveroo', amount: 28.40, category: 'Food', transaction_status: 'COMPLETED', details: 'Italian dinner' },
        { id: '33', date: '2026-03-10', name: 'FreeNow', amount: 22.00, category: 'Transport', transaction_status: 'UPCOMING', details: 'Taxi to station' },
        { id: '34', date: '2026-03-11', name: 'Vattenfall', amount: 95.00, category: 'Utilities', transaction_status: 'UPCOMING', details: 'Electricity' },
        { id: '35', date: '2026-03-11', name: 'N26 Bank', amount: 4.90, category: 'Finances', transaction_status: 'COMPLETED', details: 'Account fee' },
        { id: '36', date: '2026-03-12', name: 'Carrefour', amount: 89.20, category: 'Food', transaction_status: 'UPCOMING', details: 'Groceries' },
        { id: '37', date: '2026-03-12', name: 'Decathlon', amount: 15.00, category: 'Health', transaction_status: 'COMPLETED', details: 'Yoga mat' }
    ]);

    getTransactions() {
        return this.transactionsData.asReadonly();
    }
}
