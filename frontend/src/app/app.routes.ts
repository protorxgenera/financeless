import {Routes} from '@angular/router';
import {Dashboard} from './pages/dashboard/dashboard';
import {Transactions} from './pages/transactions/transactions-page';
import {Analytics} from './pages/analytics/analytics';
import {Settings} from './pages/settings/settings';
import {TransactionTable} from './pages/transactions/transaction-table/transaction-table';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
        data: { title: 'dashboard' }
    },
    {
        path: 'transactions',
        component: TransactionTable,
        data: { title: 'transactions' }
    },
    {
        path: 'analytics',
        component: Analytics,
        data: { title: 'analytics' }
    },
    {
        path: 'settings',
        component: Settings,
        data: { title: 'settings' }
    }
];
