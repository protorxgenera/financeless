import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    lucideCheck,
    lucideChevronDown,
    lucideChevronLeft,
    lucideChevronsUp,
    lucideChevronUp,
    lucideCircle,
    lucideCircleCheckBig,
    lucideCircleDashed,
    lucideCircleDot,
    lucideCircleHelp,
    lucideCircleOff,
    lucideCirclePlus,
    lucideGlobe,
    lucideMicVocal,
    lucideSearch,
    lucideSettings2,
    lucideX,
} from '@ng-icons/lucide';
import { BrnCommandImports } from '@spartan-ng/brain/command';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmCommandImports } from '@spartan-ng/helm/command';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import {TransactionTable} from '../transaction-table';
import {StatusIconPipe} from '../pipes/status-icon-pipe';
import {TransactionStatus} from '../services/transactions-model';
import {TransactionsService} from '../services/transactions-service';
import {CalendarDatePickerRangeComponent} from './calendar-date-picker-range';

@Component({
    selector: 'table-actions',
    imports: [
        HlmButton,
        FormsModule,
        HlmInput,
        NgIcon,
        HlmIcon,
        HlmDropdownMenuImports,
        HlmCommandImports,
        BrnCommandImports,
        HlmPopoverImports,
        HlmCheckboxImports,
        StatusIconPipe,
        CalendarDatePickerRangeComponent,
    ],
    providers: [
        provideIcons({
            lucideCheck,
            lucideChevronDown,
            lucideChevronLeft,
            lucideChevronUp,
            lucideChevronsUp,
            lucideCircle,
            lucideCircleCheckBig,
            lucideCircleDashed,
            lucideCircleDot,
            lucideCircleHelp,
            lucideCircleOff,
            lucideCirclePlus,
            lucideGlobe,
            lucideMicVocal,
            lucideSearch,
            lucideSettings2,
            lucideX,
        }),
    ],
    host: {
        class: 'block',
    },
    template: `
		<div class="wip-table-search flex flex-col justify-between items-center gap-4 sm:flex-row">
			<div class="flex flex-col justify-between gap-4 sm:flex-row">
				<!-- TASK TITLE FILTER -->
				<input hlmInput class="h-8 w-full md:w-80" placeholder="Search for transactions..." (input)="transactionFilterChange($event)" />

				<!-- STATUS FILTER -->
				<hlm-popover
					[state]="_statusState()"
					(stateChanged)="statusStateChanged($event)"
					sideOffset="5"
					closeDelay="100"
					align="start"
				>
					<button hlmBtn hlmPopoverTrigger variant="outline" size="sm" class="border-dashed">
						<ng-icon hlm name="lucideCirclePlus" class="mr-2" size="sm" />
						Status
						@if (_statusFilter().length) {
							<div data-orientation="vertical" role="none" class="bg-border mx-2 h-4 w-[1px] shrink-0"></div>

							<div class="flex gap-1">
								@for (status of _statusFilter(); track status) {
									<span class="bg-secondary text-secondary-foreground rounded px-1 py-0.5 text-xs">
										{{ status }}
									</span>
								}
							</div>
						}
					</button>
					<hlm-command *hlmPopoverPortal="let ctx" hlmPopoverContent class="w-[200px] p-0">
						<hlm-command-input placeholder="Search Status" />
						<hlm-command-list>
							<div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
							<hlm-command-group>
								@for (status of _statuses(); track status) {
									<button hlm-command-item [value]="status" (selected)="statusSelected(status)">
										<hlm-checkbox class="mr-2" [checked]="isStatusSelected(status)" />

										<ng-icon hlm [name]="status | statusIcon" class="text-muted-foreground mx-2" size="sm" />
										{{ status }}
									</button>
								}
							</hlm-command-group>
						</hlm-command-list>
					</hlm-command>
				</hlm-popover>

				<!-- CATEGORY FILTER -->
				<hlm-popover
					[state]="_categoryState()"
					(stateChanged)="categoryStateChanged($event)"
					sideOffset="5"
					closeDelay="100"
					align="start"
				>
					<button hlmBtn hlmPopoverTrigger variant="outline" size="sm" class="border-dashed">
						<ng-icon hlm name="lucideCirclePlus" class="mr-2" size="sm" />
						Category
						@if (_categoryFilter().length) {
							<div data-orientation="vertical" role="none" class="bg-border mx-2 h-4 w-[1px] shrink-0"></div>

							<div class="flex gap-1">
								@for (category of _categoryFilter(); track category) {
									<span class="bg-secondary text-secondary-foreground rounded px-1 py-0.5 text-xs">
										{{ category }}
									</span>
								}
							</div>
						}
					</button>
					<hlm-command *hlmPopoverPortal="let ctx" hlmPopoverContent class="w-[200px] p-0">
						<hlm-command-input placeholder="Search Category" />
						<hlm-command-list>
							<div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
							<hlm-command-group>
								@for (category of _categories(); track category) {
									<button hlm-command-item [value]="category" (selected)="categorySelected(category)">
										<hlm-checkbox class="mr-2" [checked]="isCategorySelected(category)" />
										{{ category }}
									</button>
								}
							</hlm-command-group>
						</hlm-command-list>
					</hlm-command>
				</hlm-popover>

				@if (_statusFilter().length || _categoryFilter().length) {
					<button hlmBtn variant="ghost" size="sm" align="end" (click)="resetFilters()">
						Reset
						<ng-icon hlm name="lucideX" class="ml-2" size="sm" />
					</button>
				}
			</div>

			<!-- COLUMN VISIBILITY -->
			<button hlmBtn class="h-8" variant="outline" align="end" [hlmDropdownMenuTrigger]="menu">
				Columns
				<ng-icon hlm name="lucideChevronDown" class="ml-2" size="sm" />
			</button>
			<ng-template #menu>
				<hlm-dropdown-menu class="w-32">
					@for (column of _hidableColumns; track column.id) {
						<button
							hlmDropdownMenuCheckbox
							class="capitalize"
							[checked]="column.getIsVisible()"
							(triggered)="column.toggleVisibility()"
						>
							<hlm-dropdown-menu-checkbox-indicator />
							{{ column.columnDef.id }}
						</button>
					}
				</hlm-dropdown-menu>
			</ng-template>

            <!-- CALENDAR RANGE PICKER -->
            <cal-date-picker-range/>

		</div>
	`,
})
export class TableActions {
    private readonly _tableComponent = inject(TransactionTable);

    protected readonly _table = this._tableComponent._table;

    protected readonly _hidableColumns = this._table.getAllColumns().filter((column) => column.getCanHide());
    protected readonly _statusFilter = signal<TransactionStatus[]>([]);
    protected readonly _statuses = signal(['COMPLETED', 'UPCOMING'] satisfies TransactionStatus[]);
    protected readonly _statusState = signal<'closed' | 'open'>('closed');

    protected readonly _categoryFilter = signal<string[]>([]);

    transactionsService = inject(TransactionsService)
    currentCategories = new Set(this.transactionsService.getTransactions()().map((item) => item.category))

    protected readonly _categories = signal([...this.currentCategories]);
    protected readonly _categoryState = signal<'closed' | 'open'>('closed');

    protected transactionFilterChange(event: Event) {
        this._table.getColumn('name')?.setFilterValue((event.target as HTMLInputElement).value);
    }

    isStatusSelected(status: TransactionStatus): boolean {
        return this._statusFilter().some((s) => s === status);
    }

    statusStateChanged(state: 'open' | 'closed') {
        this._statusState.set(state);
    }

    statusSelected(status: TransactionStatus): void {
        const current = this._statusFilter();
        const index = current.indexOf(status);
        if (index === -1) {
            this._statusFilter.set([...current, status]);
        } else {
            this._statusFilter.set(current.filter((s) => s !== status));
        }
        this._table.getColumn('status')?.setFilterValue(this._statusFilter());
    }

    isCategorySelected(category: string): boolean {
        return this._categoryFilter().some((p) => p === category);
    }

    categoryStateChanged(state: 'open' | 'closed') {
        this._categoryState.set(state);
    }

    categorySelected(category: string): void {
        const current = this._categoryFilter();
        const index = current.indexOf(category);
        if (index === -1) {
            this._categoryFilter.set([...current, category]);
        } else {
            this._categoryFilter.set(current.filter((p) => p !== category));
        }
        this._table.getColumn('category')?.setFilterValue(this._categoryFilter());
    }

    resetFilters(): void {
        this._categoryFilter.set([]);
        this._statusFilter.set([]);
        this._table.resetColumnFilters();
    }
}
