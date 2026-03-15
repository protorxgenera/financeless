import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {BrnSelect, BrnSelectImports, BrnSelectOption} from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { type CellContext, injectFlexRenderContext } from '@tanstack/angular-table';
import {Transaction} from '../../services/transactions-model';
import {TransactionTable} from '../../transaction-table';
import {TransactionsService} from '../../services/transactions-service';

@Component({
    selector: 'category-cell',
    imports: [BrnSelectImports, HlmSelectImports, BrnSelect, BrnSelectOption],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <brn-select
            id="{{ _element.id }}-category"
            [value]="_element.category ?? ''"
            (valueChange)="changeCategory(_element, $event)"
            class="inline-block"
            placeholder="Select category...">
            <hlm-select-trigger
                size="sm"
                class="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
            >
                <hlm-select-value/>
            </hlm-select-trigger>
            <hlm-select-content>
                @for (category of _currentCategories; track category) {
                    <hlm-option
                                [value]="category"
                                >{{ category }}
                    </hlm-option>
                }
            </hlm-select-content>
        </brn-select>
    `,
})
export class CategoryCell {
    private readonly _context = injectFlexRenderContext<CellContext<Transaction, unknown>>();
    protected readonly _element = this._context.row.original;
    private readonly _service = inject(TransactionsService)
    protected readonly _currentCategories = new Set(this._service.getTransactions()().map((item) => item.category))

    changeCategory(transaction: Transaction, category: string | any[] | undefined) {
        const selectedCategory = Array.isArray(category) ? category[0] : category;
        this._service.updateTransactionCategoryFromTable(transaction, selectedCategory)
        console.log(transaction)
        console.log(category)
    }

}
