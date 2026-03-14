import {Component, inject} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideCopy, lucideDelete, lucideEllipsis, lucideSquarePen} from '@ng-icons/lucide';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {HlmDropdownMenuConfig, HlmDropdownMenuImports} from '@spartan-ng/helm/dropdown-menu';
import {HlmIconImports} from '@spartan-ng/helm/icon';
import {type CellContext, injectFlexRenderContext} from '@tanstack/angular-table';
import {Transaction} from '../services/transactions-model';
import {TransactionsService} from '../services/transactions-service';
import {toast} from 'ngx-sonner';
import {HlmToaster} from '@spartan-ng/helm/sonner';
import {SuccessSonner} from './add-transaction-modal/submit-sonner/submit-sonner';
import {Dialog} from '@angular/cdk/dialog';
import {DialogService} from './dialog/dialog-service';


@Component({
    selector: 'spartan-action-dropdown',
    imports: [HlmButtonImports, NgIcon, HlmIconImports, HlmDropdownMenuImports, HlmToaster, SuccessSonner],
    providers: [provideIcons({lucideEllipsis, lucideCopy, lucideDelete, lucideSquarePen})],
    template: `
        <button hlmBtn variant="ghost" class="h-8 w-8 p-0" [hlmDropdownMenuTrigger]="ActionDropDownMenu" align="end">
            <span class="sr-only">Open menu</span>
            <ng-icon hlm size="sm" name="lucideEllipsis"/>
        </button>

        <ng-template #ActionDropDownMenu>
            <hlm-dropdown-menu>
                <hlm-dropdown-menu-label>Actions</hlm-dropdown-menu-label>
                <button hlmDropdownMenuItem (click)="copyTransactionId()">
                    <ng-icon hlm name="lucideCopy" size="sm"/>
                    Copy transaction ID
                </button>
                <button hlmDropdownMenuItem (click)="updateTransaction()">
                    <ng-icon hlm name="lucideSquarePen" size="sm"/>
                    Update transaction details
                </button>
                <hlm-dropdown-menu-separator/>
                <button hlmDropdownMenuItem (click)="deleteTransaction()">
                    <ng-icon hlm name="lucideDelete" size="sm"/>
                    Delete transaction
                </button>
            </hlm-dropdown-menu>
        </ng-template>
    `,
})
export class ActionDropdown {
    private readonly _context = injectFlexRenderContext<CellContext<Transaction, unknown>>();
    private readonly _service = inject(TransactionsService)
    private _confirmService = inject(DialogService)

    copyTransactionId() {
        const transaction = this._context.row.original;
        navigator.clipboard.writeText(transaction.id);

        toast.info('Transaction ID copied to clipboard', {
            description: `${transaction.name} with ID: ${transaction.id} has been copied to clipboard.`,
        });
    }

    async deleteTransaction() {
        const transaction = this._context.row.original;

        const confirmed = await this._confirmService.confirm(
            'Delete Transaction',
            `Are you sure you want to delete "${transaction.name}"?`
        )

        if (confirmed) {
            this._service.deleteTransactionFromList(transaction.id)

            toast.info('Transaction deleted', {
                description: `${transaction.name} for ${transaction.amount} has been deleted.`,
            });
        }
    }

    updateTransaction() {
        const transaction = this._context.row.original;

        console.log(transaction)

        const tableMeta = this._context.table.options.meta as any;
        const modal = tableMeta?.modal;

        if (modal) {
            modal.open(transaction);
        }
    }
}
