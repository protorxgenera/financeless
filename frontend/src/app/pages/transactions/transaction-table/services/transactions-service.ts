import {Injectable, signal} from '@angular/core';
import {Transaction} from './transactions-model';

@Injectable({
    providedIn: 'root',
})
export class TransactionsService {
    private transactionsData = signal<Transaction[]>([
        // --- INCOME (Monthly Salary & Sunday Tutoring) ---
        { id: 'inc-1', date: '2025-12-05 09:00:00.000', name: 'CIM Salary', amount: 6800.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Monthly recurr.' },
        { id: 'inc-2', date: '2026-01-05 09:00:00.000', name: 'CIM Salary', amount: 6800.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Monthly recurr.' },
        { id: 'inc-3', date: '2026-02-05 09:00:00.000', name: 'CIM Salary', amount: 6800.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Monthly recurr.' },
        { id: 'inc-4', date: '2026-03-05 09:00:00.000', name: 'CIM Salary', amount: 6800.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Monthly recurr.' },

        { id: 'tut-1', date: '2025-12-07 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },
        { id: 'tut-2', date: '2025-12-14 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },
        { id: 'tut-3', date: '2026-01-11 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },
        { id: 'tut-4', date: '2026-02-01 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },
        { id: 'tut-5', date: '2026-03-08 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },
        { id: 'tut-6', date: '2026-03-22 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },

        // --- INTERNATIONAL SUBSCRIPTIONS (USD) ---
        { id: 'sub-1', date: '2026-03-10 00:01:00.000', name: 'Netflix', amount: -15.49, currency: 'usd', category: 'Entertainment', transaction_status: 'COMPLETED', details: 'Premium Plan' },
        { id: 'sub-2', date: '2026-03-15 00:01:00.000', name: 'Spotify', amount: -10.99, currency: 'usd', category: 'Entertainment', transaction_status: 'COMPLETED', details: 'Family Sub' },
        { id: 'sub-3', date: '2026-03-20 00:01:00.000', name: 'Adobe Creative Cloud', amount: -54.99, currency: 'usd', category: 'Work', transaction_status: 'COMPLETED', details: 'All Apps' },

        // --- UPCOMING (April Subscriptions) ---
        { id: 'up-1', date: '2026-04-10 00:01:00.000', name: 'Netflix', amount: -15.49, currency: 'usd', category: 'Entertainment', transaction_status: 'UPCOMING', details: 'Renewal' },
        { id: 'up-2', date: '2026-04-15 00:01:00.000', name: 'Spotify', amount: -10.99, currency: 'usd', category: 'Entertainment', transaction_status: 'UPCOMING', details: 'Renewal' },
        { id: 'up-3', date: '2026-04-20 00:01:00.000', name: 'Adobe Creative Cloud', amount: -54.99, currency: 'usd', category: 'Work', transaction_status: 'UPCOMING', details: 'Renewal' },

        // --- AMAZON DE (EUR) ---
        { id: 'eur-1', date: '2026-01-15 14:20:00.000', name: 'Amazon.de', amount: -89.90, currency: 'eur', category: 'Shopping', transaction_status: 'COMPLETED', details: 'Logitech Mouse' },
        { id: 'eur-2', date: '2026-02-12 18:45:00.000', name: 'Amazon.de', amount: -124.50, currency: 'eur', category: 'Shopping', transaction_status: 'COMPLETED', details: 'Kitchen Scale + Books' },

        // --- LOCAL BUCHAREST SPENDING (RON) ---
        { id: 'ron-1', date: '2026-03-01 19:30:00.000', name: 'Mega Image Concept Store', amount: -245.60, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Weekly groceries' },
        { id: 'ron-2', date: '2026-03-02 08:15:00.000', name: 'OTR Metro', amount: -3.00, currency: 'ron', category: 'Transport', transaction_status: 'COMPLETED', details: 'Subway trip' },
        { id: 'ron-3', date: '2026-03-04 13:00:00.000', name: 'Modelier', amount: -68.00, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Lunch with friends' },
        { id: 'ron-4', date: '2026-03-06 21:00:00.000', name: 'Control Club', amount: -120.00, currency: 'ron', category: 'Entertainment', transaction_status: 'COMPLETED', details: 'Drinks' },
        { id: 'ron-5', date: '2026-03-10 10:45:00.000', name: 'Lidl Pipera', amount: -189.34, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Stock up' },
        { id: 'ron-6', date: '2026-03-12 16:30:00.000', name: 'Dante International (eMAG)', amount: -349.99, currency: 'ron', category: 'Shopping', transaction_status: 'COMPLETED', details: 'Air Fryer' },
        { id: 'ron-7', date: '2026-01-20 12:00:00.000', name: 'Enel Energie', amount: -156.20, currency: 'ron', category: 'Utilities', transaction_status: 'COMPLETED', details: 'Electricity' },
        { id: 'ron-8', date: '2026-02-20 12:00:00.000', name: 'Digi Romania', amount: -45.00, currency: 'ron', category: 'Utilities', transaction_status: 'COMPLETED', details: 'Fiber Internet' },
        { id: 'ron-9', date: '2026-02-25 15:10:00.000', name: 'Farmacia Tei', amount: -210.45, currency: 'ron', category: 'Health', transaction_status: 'COMPLETED', details: 'Vitamins & Skincare' },
        { id: 'ron-10', date: '2026-03-14 20:00:00.000', name: 'Fratelli Herastrau', amount: -450.00, currency: 'ron', category: 'Entertainment', transaction_status: 'COMPLETED', details: 'Dinner' },

        // More localized items for variety
        { id: 'ron-11', date: '2025-12-22 17:00:00.000', name: 'Targul de Craciun', amount: -85.00, currency: 'ron', category: 'Entertainment', transaction_status: 'COMPLETED', details: 'Mulled wine & snacks' },
        { id: 'ron-12', date: '2026-01-08 09:30:00.000', name: 'Bolt Ride', amount: -24.50, currency: 'ron', category: 'Transport', transaction_status: 'COMPLETED', details: 'Work commute' },
        { id: 'ron-13', date: '2026-01-10 11:00:00.000', name: 'Carturesti Carusel', amount: -115.00, currency: 'ron', category: 'Shopping', transaction_status: 'COMPLETED', details: 'Art books' },
        { id: 'ron-14', date: '2026-02-14 19:00:00.000', name: 'Stadio Unirii', amount: -280.00, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Valentine\'s Dinner' },
        { id: 'ron-15', date: '2026-03-18 10:00:00.000', name: 'OMV Petrom', amount: -310.00, currency: 'ron', category: 'Transport', transaction_status: 'COMPLETED', details: 'Full tank fuel' },
        { id: 'ron-16', date: '2026-03-25 14:00:00.000', name: 'Kaufland Barbu Vacarescu', amount: -342.10, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Monthly supplies' },

        // --- DEC 2025: Holiday Spending & Winter Prep ---
        { id: 'ron-17', date: '2025-12-10 18:30:00.000', name: 'ZARA Afi Cotroceni', amount: -459.00, currency: 'ron', category: 'Shopping', transaction_status: 'COMPLETED', details: 'Winter Coat' },
        { id: 'ron-18', date: '2025-12-12 12:15:00.000', name: 'Hidroelectrica', amount: -112.40, currency: 'ron', category: 'Utilities', transaction_status: 'COMPLETED', details: 'Electricity Bill' },
        { id: 'ron-19', date: '2025-12-15 20:00:00.000', name: 'Therme Bucuresti', amount: -145.00, currency: 'ron', category: 'Health', transaction_status: 'COMPLETED', details: 'Relaxation' },
        { id: 'eur-3', date: '2025-12-18 10:00:00.000', name: 'Ryanair', amount: -64.20, currency: 'eur', category: 'Travel', transaction_status: 'COMPLETED', details: 'Flight to Vienna' },
        { id: 'ron-20', date: '2025-12-20 15:45:00.000', name: 'Cărturești Carusel', amount: -215.00, currency: 'ron', category: 'Shopping', transaction_status: 'COMPLETED', details: 'Christmas Gifts' },
        { id: 'ron-21', date: '2025-12-23 19:20:00.000', name: 'Mega Image', amount: -380.50, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Christmas Dinner Prep' },
        { id: 'ron-22', date: '2025-12-24 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },
        { id: 'ron-23', date: '2025-12-27 14:00:00.000', name: 'H&M Baneasa', amount: -120.00, currency: 'ron', category: 'Shopping', transaction_status: 'COMPLETED', details: 'Boxing Day Sales' },
        { id: 'ron-24', date: '2025-12-30 22:00:00.000', name: 'Uber Romania', amount: -45.60, currency: 'ron', category: 'Transport', transaction_status: 'COMPLETED', details: 'NYE Prep' },

        // --- JAN 2026: The "Cheap" Month & Sales ---
        { id: 'ron-25', date: '2026-01-02 10:30:00.000', name: 'Starbucks Victoriei', amount: -24.00, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'First coffee of the year' },
        { id: 'ron-26', date: '2026-01-04 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },
        { id: 'ron-27', date: '2026-01-07 18:00:00.000', name: 'World Class Romania', amount: -210.00, currency: 'ron', category: 'Health', transaction_status: 'COMPLETED', details: 'Monthly Gym Sub' },
        { id: 'usd-4', date: '2026-01-10 09:00:00.000', name: 'ChatGPT Plus', amount: -20.00, currency: 'usd', category: 'Work', transaction_status: 'COMPLETED', details: 'AI Subscription' },
        { id: 'ron-28', date: '2026-01-12 13:00:00.000', name: 'Brico Depot', amount: -89.00, currency: 'ron', category: 'Housing', transaction_status: 'COMPLETED', details: 'Light bulbs & tools' },
        { id: 'eur-4', date: '2026-01-15 11:45:00.000', name: 'Amazon.de', amount: -45.99, currency: 'eur', category: 'Shopping', transaction_status: 'COMPLETED', details: 'Phone Case' },
        { id: 'ron-29', date: '2026-01-18 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },
        { id: 'ron-30', date: '2026-01-22 17:30:00.000', name: 'Lidl', amount: -156.40, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Weekly shopping' },
        { id: 'ron-31', date: '2026-01-25 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },
        { id: 'ron-32', date: '2026-01-28 20:00:00.000', name: 'Glovo - Burger King', amount: -54.00, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Late dinner' },
        { id: 'ron-33', date: '2026-01-30 08:30:00.000', name: 'Metrorex', amount: -80.00, currency: 'ron', category: 'Transport', transaction_status: 'COMPLETED', details: 'Monthly pass' },

        // --- FEB 2026: Bills & Mid-winter Shopping ---
        { id: 'ron-34', date: '2026-02-02 12:00:00.000', name: 'Engie Romania', amount: -412.50, currency: 'ron', category: 'Utilities', transaction_status: 'COMPLETED', details: 'Gas Heating Bill' },
        { id: 'ron-35', date: '2026-02-04 14:00:00.000', name: 'Kaufland', amount: -289.00, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Bulk groceries' },
        { id: 'ron-36', date: '2026-02-07 19:30:00.000', name: 'Cinema City ParkLake', amount: -76.00, currency: 'ron', category: 'Entertainment', transaction_status: 'COMPLETED', details: '2x Movie tickets' },
        { id: 'usd-5', date: '2026-02-10 09:00:00.000', name: 'iCloud Storage', amount: -0.99, currency: 'usd', category: 'Work', transaction_status: 'COMPLETED', details: 'Monthly 50GB' },
        { id: 'ron-37', date: '2026-02-12 11:00:00.000', name: 'Fan Courier', amount: -25.00, currency: 'ron', category: 'Transport', transaction_status: 'COMPLETED', details: 'OLX delivery' },
        { id: 'ron-38', date: '2026-02-15 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },
        { id: 'eur-5', date: '2026-02-18 16:20:00.000', name: 'Steam Games', amount: -29.99, currency: 'eur', category: 'Entertainment', transaction_status: 'COMPLETED', details: 'Indie Game Bundle' },
        { id: 'ron-39', date: '2026-02-21 13:45:00.000', name: 'Decathlon Pallady', amount: -185.00, currency: 'ron', category: 'Health', transaction_status: 'COMPLETED', details: 'Hiking boots' },
        { id: 'ron-40', date: '2026-02-24 18:15:00.000', name: 'Mega Image', amount: -94.20, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Snacks' },
        { id: 'ron-41', date: '2026-02-28 21:00:00.000', name: 'The Urbanist', amount: -110.00, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Cocktails' },

        // --- MARCH 2026: Current Month ---
        { id: 'ron-42', date: '2026-03-01 10:00:00.000', name: 'Mărțișoare Street Vendor', amount: -60.00, currency: 'ron', category: 'Shopping', transaction_status: 'COMPLETED', details: 'Spring traditions' },
        { id: 'ron-43', date: '2026-03-03 12:00:00.000', name: 'Hidroelectrica', amount: -98.00, currency: 'ron', category: 'Utilities', transaction_status: 'COMPLETED', details: 'Electricity' },
        { id: 'ron-44', date: '2026-03-05 19:00:00.000', name: 'Tazz - Dristor Kebab', amount: -42.00, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Dinner' },
        { id: 'ron-46', date: '2026-03-08 14:00:00.000', name: 'Maison des Fleurs', amount: -150.00, currency: 'ron', category: 'Shopping', transaction_status: 'COMPLETED', details: '8 March Flowers' },
        { id: 'eur-6', date: '2026-03-10 15:30:00.000', name: 'Booking.com', amount: -210.00, currency: 'eur', category: 'Travel', transaction_status: 'COMPLETED', details: 'Brașov Trip Deposit' },
        { id: 'ron-47', date: '2026-03-12 08:45:00.000', name: 'Petrom Gas Station', amount: -320.00, currency: 'ron', category: 'Transport', transaction_status: 'COMPLETED', details: 'Full tank' },
        { id: 'ron-48', date: '2026-03-13 18:00:00.000', name: 'Humanic Promenada', amount: -349.00, currency: 'ron', category: 'Shopping', transaction_status: 'COMPLETED', details: 'New Shoes' },
        { id: 'ron-49', date: '2026-03-14 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },
        { id: 'ron-50', date: '2026-03-15 12:00:00.000', name: 'Dante International (eMAG)', amount: -85.90, currency: 'ron', category: 'Shopping', transaction_status: 'COMPLETED', details: 'HDMI Cable' },
        { id: 'ron-51', date: '2026-03-16 19:30:00.000', name: 'Mega Image', amount: -112.00, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Weekly groceries' },
        { id: 'ron-52', date: '2026-03-17 13:00:00.000', name: 'Obor Market', amount: -65.00, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Fresh veggies' },
        { id: 'ron-53', date: '2026-03-18 20:00:00.000', name: 'Bolt Food', amount: -38.50, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Sushi night' },
        { id: 'ron-54', date: '2026-03-19 17:45:00.000', name: 'Farmacia Dona', amount: -45.20, currency: 'ron', category: 'Health', transaction_status: 'COMPLETED', details: 'Cold medicine' },
        { id: 'ron-55', date: '2026-03-20 09:15:00.000', name: 'Blue Air Refund', amount: 450.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Old flight refund' },
        { id: 'ron-56', date: '2026-03-21 21:30:00.000', name: 'Beraria H', amount: -124.00, currency: 'ron', category: 'Entertainment', transaction_status: 'COMPLETED', details: 'Beer and snacks' },
        { id: 'ron-58', date: '2026-03-23 18:30:00.000', name: 'H&M', amount: -75.00, currency: 'ron', category: 'Shopping', transaction_status: 'COMPLETED', details: 'T-shirts' },
        { id: 'ron-59', date: '2026-03-24 12:00:00.000', name: 'Orange Romania', amount: -62.00, currency: 'ron', category: 'Utilities', transaction_status: 'COMPLETED', details: 'Mobile bill' },
        { id: 'ron-60', date: '2026-03-25 14:00:00.000', name: 'IKEA Pallady', amount: -450.00, currency: 'ron', category: 'Housing', transaction_status: 'COMPLETED', details: 'Small furniture' },
        { id: 'ron-61', date: '2026-03-26 19:00:00.000', name: 'Mega Image', amount: -88.40, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Dinner stuff' },
        { id: 'ron-62', date: '2026-03-27 10:00:00.000', name: 'CFR Calatori', amount: -54.00, currency: 'ron', category: 'Transport', transaction_status: 'COMPLETED', details: 'Train to Ploiesti' },
        { id: 'ron-63', date: '2026-03-28 20:00:00.000', name: 'Shift Pub', amount: -140.00, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Dinner out' },
        { id: 'ron-64', date: '2026-03-29 11:00:00.000', name: 'English Tutoring', amount: 125.00, currency: 'ron', category: 'Income', transaction_status: 'COMPLETED', details: 'Sunday session' },
        { id: 'ron-65', date: '2026-03-30 09:00:00.000', name: 'Regina Maria', amount: -250.00, currency: 'ron', category: 'Health', transaction_status: 'COMPLETED', details: 'Annual checkup' },
        { id: 'ron-66', date: '2026-03-31 16:00:00.000', name: 'Mega Image', amount: -42.50, currency: 'ron', category: 'Food', transaction_status: 'COMPLETED', details: 'Small shopping' },

        { id: 'up-4', date: '2026-04-01 09:00:00.000', name: 'Digi Romania', amount: -45.00, currency: 'ron', category: 'Utilities', transaction_status: 'UPCOMING', details: 'Future Bill' },
        { id: 'up-5', date: '2026-04-05 09:00:00.000', name: 'CIM Salary', amount: 6800.00, currency: 'ron', category: 'Income', transaction_status: 'UPCOMING', details: 'Pending Payday' },
        { id: 'up-6', date: '2026-04-12 10:00:00.000', name: 'Hidroelectrica', amount: -105.00, currency: 'ron', category: 'Utilities', transaction_status: 'UPCOMING', details: 'Estimated' },
        { id: 'up-7', date: '2026-04-14 09:00:00.000', name: 'World Class Romania', amount: -210.00, currency: 'ron', category: 'Health', transaction_status: 'UPCOMING', details: 'Subscription Renewal' },
    ]);

    getTransactions() {
        return this.transactionsData.asReadonly();
    }

    addTransaction(transaction: Transaction) {
        this.transactionsData.update(
            (data) => { return [...data, transaction] }
    )
    }

    deleteTransactionFromList(id: string) {
        this.transactionsData.update(
            (data) => {
                return data.filter((element) => element.id !== id )
            }
        )
    }

    updateTransactionFromModal(transaction: Transaction) {
        this.transactionsData.update(
            (data) => {
                return data.map((item) => {
                        if (item.id === transaction.id) {
                            return transaction
                        }
                        return item
                    }
                )
            }
        )
    }
}
