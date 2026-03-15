import {Component, effect, inject, signal, viewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
    lucideChevronDown,
    lucideChevronLeft,
    lucideChevronRight,
    lucideChevronsLeft,
    lucideChevronsRight,
    lucideCirclePlus
} from '@ng-icons/lucide';
import {BrnSelect, BrnSelectImports} from '@spartan-ng/brain/select';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {HlmDropdownMenuImports} from '@spartan-ng/helm/dropdown-menu';
import {HlmIconImports} from '@spartan-ng/helm/icon';
import {HlmSelectImports} from '@spartan-ng/helm/select';
import {HlmTableImports} from '@spartan-ng/helm/table';
import {hlmMuted} from '@spartan-ng/helm/typography';
import {
    type ColumnDef,
    type ColumnFiltersState,
    createAngularTable,
    flexRenderComponent,
    FlexRenderDirective,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    type RowSelectionState,
    type SortingState,
    type VisibilityState,
} from '@tanstack/angular-table';
import {ActionDropdown} from './components/action-dropdown';
import {TableHeadSelection, TableRowSelection} from './components/selection-column';
import {TableHeadSortButton} from './components/sort-header-button';
import {Transaction} from './services/transactions-model';
import {TransactionsService} from './services/transactions-service';
import {StatusIconCell} from './components/cells/status-icon-cell';
import {TableActions} from './components/table-actions';
import {HlmLabelImports} from '@spartan-ng/helm/label';
import {AddTransactionModal} from './components/add-transaction-modal/add-transaction-modal';
import {CategoryCell} from './components/cells/category-cell';

@Component({
    selector: 'transaction-table',
    imports: [
        FlexRenderDirective,
        FormsModule,
        HlmDropdownMenuImports,
        HlmButtonImports,
        NgIcon,
        HlmIconImports,
        BrnSelectImports,
        HlmSelectImports,
        HlmTableImports,
        TableActions,
        BrnSelect,
        HlmLabelImports,
        AddTransactionModal,

    ],
    host: {
        class: 'flex flex-1 flex-col min-h-0 w-full overflow-hidden'
    },
    providers: [provideIcons({ lucideChevronDown, lucideChevronLeft, lucideChevronsLeft, lucideChevronRight, lucideChevronsRight, lucideCirclePlus})],
    templateUrl: './transaction-table.html',
    styleUrl: './transaction-table.css',
})
export class TransactionTable {

    private service = inject(TransactionsService)
    public readonly modal = viewChild<AddTransactionModal>('addOrUpdateModal');

    TRANSACTION_DATA = this.service.getTransactions()


    constructor() {
        effect(() => {
            const modalRef = this.modal();
            if (modalRef) {
                this._table.setOptions({
                    ...this._table.options,
                    meta: { modal: modalRef }
                });
            }
        });
    }

    protected readonly _columns: ColumnDef<Transaction>[] = [
        {
            id: 'select',
            header: () => flexRenderComponent(TableHeadSelection),
            cell: () => flexRenderComponent(TableRowSelection),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'date',
            id: 'date',
            size: 20,
            header: () => flexRenderComponent(TableHeadSortButton, { inputs: { header: '' } }),
            cell: (info) => {

                const date = info.getValue<string>().split(' ')[0]
                const time = info.getValue<string>().split(' ')[1].slice(0, 5)
                // format date
                // format time

                return `<div>${date}</div><div>${time}</div>`
            },
        },
        {
            accessorKey: 'name',
            id: 'name',
            header: () => flexRenderComponent(TableHeadSortButton, { inputs: { header: '' } }),
            cell: (info) => `<div>${info.getValue<string>()}</div>`,
        },
        {
            accessorKey: 'category',
            id: 'category',
            filterFn: 'arrIncludesSome',
            header: () => flexRenderComponent(TableHeadSortButton, { inputs: { header: '' } }),
            cell: (info) => flexRenderComponent(CategoryCell),
        },
        {
            accessorKey: 'details',
            id: 'details',
            header: () => flexRenderComponent(TableHeadSortButton, { inputs: { header: '' } }),
            cell: (info) => `<div class="lowercase">${info.getValue<string>()}</div>`,
        },
        {
            accessorKey: 'transaction_status',
            id: 'status',
            header: 'Status',
            enableSorting: false,
            cell: () => flexRenderComponent(StatusIconCell),
        },
        {
            accessorKey: 'amount',
            id: 'amount',
            header: '<div class="text-right">Amount</div>',
            enableSorting: false,
            filterFn: 'inNumberRange',
            cell: (info) => {
                const amount = parseFloat(info.getValue<string>());
                const formatted = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: info.cell.row.original.currency,
                }).format(amount);


                return `<div class="text-right">${formatted}</div>`;
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: () => flexRenderComponent(ActionDropdown),
        },
    ];

    private readonly _columnFilters = signal<ColumnFiltersState>([]);
    private readonly _sorting = signal<SortingState>([
        { id: 'date', desc: true }
    ]);
    private readonly _rowSelection = signal<RowSelectionState>({});
    private readonly _columnVisibility = signal<VisibilityState>({});
    private readonly _pagination = signal<PaginationState>({
        pageSize: 10,
        pageIndex: 0,
    });
    protected readonly _availablePageSizes = [5, 10, 15, 20, 10000];
    protected readonly _pageSize = signal(this._availablePageSizes[1]);

    readonly _table = createAngularTable<Transaction>(() => ({
        data: this.TRANSACTION_DATA(),
        columns: this._columns,
        onSortingChange: (updater) => {
            updater instanceof Function ? this._sorting.update(updater) : this._sorting.set(updater);
        },
        onColumnFiltersChange: (updater) => {
            updater instanceof Function ? this._columnFilters.update(updater) : this._columnFilters.set(updater);
        },
        onColumnVisibilityChange: (updater) => {
            updater instanceof Function ? this._columnVisibility.update(updater) : this._columnVisibility.set(updater);
        },
        onRowSelectionChange: (updater) => {
            updater instanceof Function ? this._rowSelection.update(updater) : this._rowSelection.set(updater);
        },
        onPaginationChange: (updater) => {
            updater instanceof Function ? this._pagination.update(updater) : this._pagination.set(updater);
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: this._sorting(),
            columnFilters: this._columnFilters(),
            columnVisibility: this._columnVisibility(),
            rowSelection: this._rowSelection(),
            pagination: this._pagination(),
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
        columnResizeMode: 'onChange',
    }));
    protected readonly _hidableColumns = this._table.getAllColumns().filter((column) => column.getCanHide());

    protected _filterChange(email: Event) {
        const target = email.target as HTMLInputElement;
        const typedValue = target.value;
        this._table.setGlobalFilter(typedValue);
    }

    protected readonly hlmMuted = hlmMuted;
}
