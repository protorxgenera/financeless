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



}
