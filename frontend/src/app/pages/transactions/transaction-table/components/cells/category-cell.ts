import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {BrnSelectImports} from '@spartan-ng/brain/select';
import {type CellContext, injectFlexRenderContext} from '@tanstack/angular-table';
import {Transaction} from '../../services/transactions-model';
import {TransactionsService} from '../../services/transactions-service';
import {HlmCommandImports, HlmCommandInput} from '@spartan-ng/helm/command';
import {HlmPopoverImports} from '@spartan-ng/helm/popover';
import {HlmIconImports} from '@spartan-ng/helm/icon';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {provideIcons} from '@ng-icons/core';
import {lucideCheck, lucideChevronDown,} from '@ng-icons/lucide';
import {toast} from 'ngx-sonner';

@Component({
    selector: 'category-cell',
    imports: [BrnSelectImports, HlmCommandInput, HlmPopoverImports, HlmCommandImports, HlmIconImports, HlmButtonImports],
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
                <p class="font-normal text-primary"
                   [class.opacity-50]="!selectedCategory()">{{ selectedCategory() ? selectedCategory() : 'Select category...' }}</p>
                <ng-icon hlm name="lucideChevronDown" size="sm" class="text-ring"/>
            </button>
            <hlm-popover-content class="w-50 p-0" *hlmPopoverPortal="let ctx">
                <hlm-command>
                    <hlm-command-input placeholder="Search category"/>
                    <hlm-command-list>
                        <hlm-command-group>

                            @for (category of categories; track category) {
                                @if(category) {

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
                            }}

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

    private readonly _transactionId = this._context.row.original.id;

    protected readonly element = this._context.row.original;
    protected readonly categories = this._service.getCategories()

    public readonly selectedCategory = computed(() => {
        const transaction = this._service.getTransactions()()
            .find(t => t.id === this._transactionId);
        return transaction?.category;
    });

    changeCategory(transaction: Transaction, category: string | any[] | undefined) {
        const cleanedCategory = Array.isArray(category) ? category[0] : category;
        const updatedCategory = cleanedCategory === this.selectedCategory() ? '' : cleanedCategory
        this._service.updateTransactionCategoryFromTable(transaction, updatedCategory)
        const messageCategory = updatedCategory === '' ? 'none' : updatedCategory

        toast.info('Transaction category updated', {
            description: `Transaction: ${transaction.name} has been updated with category: ${messageCategory}.`,
        });
    }
}
