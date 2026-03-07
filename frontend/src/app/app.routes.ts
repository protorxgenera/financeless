import {Routes} from '@angular/router';
import {Dashboard} from './pages/dashboard/dashboard';
import {Transactions} from './pages/transactions/transactions';
import {Analytics} from './pages/analytics/analytics';
import {Settings} from './pages/settings/settings';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard
    },
    {
        path: 'transactions',
        component: Transactions
    },
    {
        path: 'analytics',
        component: Analytics
    },
    {
        path: 'settings',
        component: Settings
    }
];
