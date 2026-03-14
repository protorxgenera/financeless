import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
    lucideCheck,
    lucideChevronDown,
    lucideChevronLeft,
    lucideChevronsUp,
    lucideChevronsUpDown,
    lucideChevronUp,
    lucideCircle,
    lucideCircleCheckBig,
    lucideCircleDashed,
    lucideCircleDot,
    lucideCircleFadingPlus,
    lucideCircleHelp,
    lucideCircleMinus,
    lucideCircleOff,
    lucideCirclePlus,
    lucideGlobe,
    lucideMicVocal,
    lucideSearch,
    lucideSettings2,
    lucideX,
} from '@ng-icons/lucide';
import {BrnCommandImports} from '@spartan-ng/brain/command';
import {HlmButton} from '@spartan-ng/helm/button';
import {HlmCheckboxImports} from '@spartan-ng/helm/checkbox';
import {HlmCommandImports} from '@spartan-ng/helm/command';
import {HlmDropdownMenuImports} from '@spartan-ng/helm/dropdown-menu';
import {HlmIcon} from '@spartan-ng/helm/icon';
import {HlmPopoverImports} from '@spartan-ng/helm/popover';
import {TransactionTable} from '../transaction-table';
import {StatusIconPipe} from '../pipes/status-icon-pipe';
import {TransactionStatus, TransactionType} from '../services/transactions-model';
import {TransactionsService} from '../services/transactions-service';
import {CalendarDatePickerRangeComponent} from './calendar-date-picker-range';
import {HlmInputGroupImports} from '@spartan-ng/helm/input-group';
import {TitleCasePipe} from '@angular/common';
import {TypeIconPipe} from '../pipes/type-icon-pipe';

@Component({
    selector: 'table-actions',
    imports: [
        HlmButton,
        FormsModule,
        NgIcon,
        HlmIcon,
        HlmDropdownMenuImports,
        HlmCommandImports,
        BrnCommandImports,
        HlmPopoverImports,
        HlmCheckboxImports,
        StatusIconPipe,
        CalendarDatePickerRangeComponent,
        HlmInputGroupImports,
        TitleCasePipe,
        TypeIconPipe,
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
            lucideCircleFadingPlus,
            lucideCircleMinus,
            lucideChevronsUpDown,
        }),
    ],
    host: {
        class: 'block',
    },
    template: `
        <div class="wip-table-search flex flex-col justify-between items-center gap-4 sm:flex-row">
            <div class="flex flex-col justify-between gap-4 sm:flex-row">

                <!-- TRANSACTION SEARCH -->
                <div hlmInputGroup class="h-8">
                    <input hlmInputGroupInput class="w-full md:w-80" placeholder="Search for transactions..."
                           (input)="transactionFilterChange($event)"/>
                    <div hlmInputGroupAddon>
                        <ng-icon name="lucideSearch"/>
                    </div>
                </div>

                <!-- STATUS FILTER -->
                <hlm-popover
                    [state]="_statusState()"
                    (stateChanged)="statusStateChanged($event)"
                    sideOffset="5"
                    closeDelay="100"
                    align="start"
                >
                    <button hlmBtn hlmPopoverTrigger variant="outline" size="sm" class="border-dashed">
                        <ng-icon hlm [name]="_currentStatus() | statusIcon" class="mr-2" size="sm"/>
                        {{ (_currentStatus() ? _currentStatus() : 'Status') | titlecase }}
                        <ng-icon hlm size="sm" name="lucideChevronsUpDown" class="opacity-50"/>
                    </button>

                    <hlm-command *hlmPopoverPortal="let ctx" hlmPopoverContent class="w-50 p-0">
                        <hlm-command-list>
                            <hlm-command-group>

                                @for (status of _statuses(); track status) {

                                    <button hlm-command-item
                                            [value]="status"
                                            (selected)="statusSelected(status)">
                                        <ng-icon hlm [name]="status | statusIcon" class="text-muted-foreground"
                                                 size="sm"/>
                                        <span>{{ status | titlecase }}</span>
                                        <ng-icon
                                            hlm
                                            class="ml-auto"
                                            [class.opacity-0]="_currentStatus() !== status"
                                            name="lucideCheck"
                                            hlmCommandIcon
                                        />
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
                        <ng-icon hlm name="lucideCirclePlus" class="mr-2" size="sm"/>
                        Category
                        @if (_categoryFilter().length) {
                            <div data-orientation="vertical" role="none"
                                 class="bg-border mx-2 h-4 w-px shrink-0"></div>

                            <div class="flex gap-1">
                                @for (category of _categoryFilter(); track category) {
                                    <span class="bg-secondary text-secondary-foreground rounded px-1 py-0.5 text-xs">
										{{ category }}
									</span>
                                }
                            </div>
                        }
                    </button>
                    <hlm-command *hlmPopoverPortal="let ctx" hlmPopoverContent class="w-50 p-0">
                        <hlm-command-input placeholder="Search Category"/>
                        <hlm-command-list>
                            <div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
                            <hlm-command-group>
                                @for (category of _categories(); track category) {
                                    <button hlm-command-item [value]="category" (selected)="categorySelected(category)">
                                        <hlm-checkbox class="mr-2" [checked]="isCategorySelected(category)"/>
                                        {{ category }}
                                    </button>
                                }
                            </hlm-command-group>
                        </hlm-command-list>
                    </hlm-command>
                </hlm-popover>

                <!-- TYPE [INCOME/EXPENSE] -->
                <hlm-popover
                    [state]="_typeState()"
                    (stateChanged)="typeStateChanged($event)"
                    sideOffset="5"
                    closeDelay="100"
                    align="start"
                >
                    <button hlmBtn hlmPopoverTrigger variant="outline" size="sm" class="border-dashed">
                        <ng-icon hlm [name]="_currentType() | typeIcon" class="mr-2" size="sm"/>
                        {{ (_currentType() ? _currentType() : 'Type') | titlecase }}
                        <ng-icon hlm size="sm" name="lucideChevronsUpDown" class="opacity-50"/>
                    </button>

                    <hlm-command *hlmPopoverPortal="let ctx" hlmPopoverContent class="w-50 p-0">
                        <hlm-command-list>
                            <hlm-command-group>

                                @for (type of _types(); track type) {

                                    <button hlm-command-item
                                            [value]="type"
                                            (selected)="typeSelected(type)">
                                        <ng-icon hlm [name]="type | typeIcon" class="text-muted-foreground" size="sm"/>
                                        <span>{{ type | titlecase }}</span>
                                        <ng-icon
                                            hlm
                                            class="ml-auto"
                                            [class.opacity-0]="_currentType() !== type"
                                            name="lucideCheck"
                                            hlmCommandIcon
                                        />
                                    </button>
                                }
                            </hlm-command-group>
                        </hlm-command-list>
                    </hlm-command>
                </hlm-popover>

                <!-- FILTER RESET BUTTON -->
                @if (_currentStatus() || _categoryFilter().length || _currentType()) {
                    <button hlmBtn variant="ghost" size="sm" align="end" (click)="resetFilters()">
                        Reset
                        <ng-icon hlm name="lucideX" class="ml-2" size="sm"/>
                    </button>
                }

            </div>

            <!-- COLUMN VISIBILITY -->
            <button hlmBtn class="h-8" variant="outline" align="end" [hlmDropdownMenuTrigger]="menu">
                Columns
                <ng-icon hlm name="lucideChevronDown" class="ml-2" size="sm"/>
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
                            <hlm-dropdown-menu-checkbox-indicator/>
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

    protected readonly _currentStatus = signal<TransactionStatus | undefined>(undefined)
    protected readonly _statuses = signal(['COMPLETED', 'UPCOMING'] satisfies TransactionStatus[]);
    protected readonly _statusState = signal<'closed' | 'open'>('closed');

    protected readonly _currentType = signal<TransactionType | undefined>(undefined);
    protected readonly _types = signal(['income', 'expense'] satisfies TransactionType[]); // these are the filter options that we can select
    protected readonly _typeState = signal<'closed' | 'open'>('closed'); // the state of the popover

    private readonly transactionsService = inject(TransactionsService)
    protected readonly _currentCategories = new Set(this.transactionsService.getTransactions()().map((item) => item.category))
    protected readonly _categoryFilter = signal<string[]>([]);
    protected readonly _categories = signal([...this._currentCategories]);
    protected readonly _categoryState = signal<'closed' | 'open'>('closed');

    protected transactionFilterChange(event: Event) {
        this._table.getColumn('name')?.setFilterValue((event.target as HTMLInputElement).value);
    }


    typeStateChanged(state: 'open' | 'closed') {
        this._typeState.set(state);
    }

    statusStateChanged(state: 'open' | 'closed') {
        this._statusState.set(state);
    }

    statusSelected(status: TransactionStatus): void {
        this._statusState.set('closed')
        if (this._currentStatus() === status) {
            this._currentStatus.set(undefined)
        } else {
            this._currentStatus.set(status)
        }
        this._table.getColumn('status')?.setFilterValue(this._currentStatus());
    }

    typeSelected(type: TransactionType) {
        this._typeState.set('closed')

        if (this._currentType() === type) {
            this._currentType.set(undefined)
        } else {
            this._currentType.set(type)
        }

        let filterArray: number[] = []

        if(this._currentType() === 'income') {
            filterArray = [0, Number.MAX_SAFE_INTEGER]
            this._table.getColumn('amount')?.setFilterValue(filterArray)
        } else if(this._currentType() === 'expense') {
            filterArray = [Number.MIN_SAFE_INTEGER, 0]
            this._table.getColumn('amount')?.setFilterValue(filterArray)
        }
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
        this._categoryFilter.set([])
        this._currentStatus.set(undefined)
        this._currentType.set(undefined)
        this._table.resetColumnFilters()
    }
}
