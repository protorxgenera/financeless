import { Component } from '@angular/core';
import {TransactionTable} from './transaction-table/transaction-table';

@Component({
  selector: 'app-transactions',
    imports: [
        TransactionTable
    ],
  templateUrl: './transactions-page.html',
  styleUrl: './transactions-page.css',
})
export class Transactions {

// TODO: create amount filter for the table (that filters numbers bigger than or lower than a user-defined amount).

// TODO: reformat date and time column to show time under date.

// TODO: reformat amount column to not be in dollars anymore.

}
