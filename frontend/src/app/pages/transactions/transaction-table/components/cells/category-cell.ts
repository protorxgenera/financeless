import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
import {BrnSelect, BrnSelectImports, BrnSelectOption} from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { type CellContext, injectFlexRenderContext } from '@tanstack/angular-table';
import {Transaction} from '../../services/transactions-model';
import {TransactionTable} from '../../transaction-table';
import {TransactionsService} from '../../services/transactions-service';
import {HlmCommandImports, HlmCommandInput} from '@spartan-ng/helm/command';
import {HlmComboboxImports} from '@spartan-ng/helm/combobox';
import {HlmPopoverImports} from '@spartan-ng/helm/popover';
import {HlmIconImports} from '@spartan-ng/helm/icon';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {provideIcons} from '@ng-icons/core';
import {
    lucideCheck, lucideChevronDown,
} from '@ng-icons/lucide';
import {toast} from 'ngx-sonner';

@Component({
    selector: 'category-cell',
    imports: [BrnSelectImports, HlmSelectImports, BrnSelect, BrnSelectOption, HlmCommandInput, HlmComboboxImports, HlmPopoverImports, HlmCommandImports, HlmIconImports, HlmButtonImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideIcons({ lucideCheck, lucideChevronDown})],
    template: `
        <hlm-popover sideOffset="5">
            <button
                id="select-category"
                hlmPopoverTrigger
                hlmBtn
                variant="outline"
                size="sm"
                class="w-50 flex-1 justify-between md:max-w-50 lg:max-w-75"
            >
                <p class="font-normal"
                   [class.opacity-50]="!selectedCategory()">{{ selectedCategory() ? selectedCategory() : 'Select category...' }}</p>
                <ng-icon hlm name="lucideChevronDown" size="sm" class="opacity-50"/>
            </button>
            <hlm-popover-content class="w-50 p-0" *hlmPopoverPortal="let ctx">
                <hlm-command>
                    <hlm-command-input placeholder="Search category"/>
                    <hlm-command-list>
                        <hlm-command-group>

                            @for (category of categories; track category) {
                                <button hlm-command-item [value]="category"
                                        (selected)="changeCategory(element, category); ctx.close()">
                                    {{ category }}
                                    <ng-icon
                                        hlm
                                        name="lucideCheck"
                                        size="sm"
                                        class="ml-auto"
                                        [class]="{
											'opacity-0': selectedCategory() !== category,
											'opacity-100': selectedCategory() === category,
										}"
                                    />
                                </button>
                            }

                        </hlm-command-group>
                    </hlm-command-list>

                    <!-- Empty state -->
                    <div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
                </hlm-command>
            </hlm-popover-content>
        </hlm-popover>
    `,
})
export class CategoryCell {


    private readonly _context = injectFlexRenderContext<CellContext<Transaction, unknown>>();
    private readonly _service = inject(TransactionsService)

    protected readonly element = this._context.row.original;
    protected readonly categories = new Set(this._service.getTransactions()().map((item) => item.category))
    public readonly selectedCategory = signal<string | undefined>(this.element.category);

    changeCategory(transaction: Transaction, category: string | any[] | undefined) {
        const cleanedCategory = Array.isArray(category) ? category[0] : category;
        this.selectedCategory.set(cleanedCategory)
        this._service.updateTransactionCategoryFromTable(transaction, cleanedCategory)

        toast.info('Transaction category updated', {
            description: `Transaction: ${transaction.name} has been updated with category: ${cleanedCategory}.`,
        });
    }

    // TODO: exclude undefined from category list
    // TODO: fix scrolling bar on category list [DONE]
    // TODO: maybe add search on category list  [DONE]
    // TODO: make changes in update-form affect the category column on-the-fly

}
