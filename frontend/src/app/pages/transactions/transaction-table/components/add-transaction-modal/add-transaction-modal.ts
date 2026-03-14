import {Component, computed, effect, inject, input, signal, viewChild} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideCalendar1, lucideChevronDown, lucideCross, lucideRotateCw} from '@ng-icons/lucide';
import {HlmSheetImports} from '@spartan-ng/helm/sheet';
import {HlmLabelImports} from '@spartan-ng/helm/label';
import {HlmInputImports} from '@spartan-ng/helm/input';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {HlmIcon} from '@spartan-ng/helm/icon';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HlmInputGroupImports} from '@spartan-ng/helm/input-group';
import {HlmFieldImports} from '@spartan-ng/helm/field';
import {HlmRadioGroupImports} from '@spartan-ng/helm/radio-group';
import {HlmDropdownMenuImports} from '@spartan-ng/helm/dropdown-menu';
import {BrnSelect, BrnSelectImports} from '@spartan-ng/brain/select';
import {HlmSelectImports} from '@spartan-ng/helm/select';
import {TransactionsService} from '../../services/transactions-service';
import {HlmDatePickerImports} from '@spartan-ng/helm/date-picker';
import {Transaction} from '../../services/transactions-model';
import {numericValidator} from '../../validators/numeric-validator';
import {HlmAlertDialogImports} from '@spartan-ng/helm/alert-dialog';
import {BrnSheet, BrnSheetImports} from '@spartan-ng/brain/sheet';
import {toast} from 'ngx-sonner';
import {SuccessSonner} from './submit-sonner/submit-sonner';

@Component({
    selector: 'add-transaction-modal',
    imports: [
        HlmSheetImports,
        HlmLabelImports,
        HlmInputImports,
        HlmButtonImports,
        HlmIcon,
        NgIcon,
        ReactiveFormsModule,
        HlmInputGroupImports,
        HlmFieldImports,
        HlmRadioGroupImports,
        HlmDropdownMenuImports,
        BrnSelectImports,
        BrnSheetImports,
        HlmSelectImports,
        BrnSelect,
        HlmDatePickerImports,
        HlmAlertDialogImports,
        SuccessSonner,
    ],
    providers: [provideIcons({lucideCross, lucideChevronDown, lucideRotateCw, lucideCalendar1})],
    templateUrl: './add-transaction-modal.html',
    styleUrl: './add-transaction-modal.css',
})
export class AddTransactionModal {

    public transaction = signal<Transaction | null>(null);
    public mode = computed(() => this.transaction() ? 'Update' : 'Add')

    public readonly sheetRef = viewChild(BrnSheet)

    private readonly service = inject(TransactionsService)
    protected categories = new Set(this.service.getTransactions()().map((item) => item.category))

    private readonly _fb = inject(FormBuilder)
    private _now: Date = new Date()
    private _currentTime= this._now.toTimeString().split(' ')[0]

    constructor() {

        effect(() => {
            const data = this.transaction()
            if (data) {

                const timePart = data.date.includes(' ')
                    ? data.date.split(' ')[1].substring(0, 8)
                    : this._currentTime

                this.form.patchValue(
                    {
                        type: data.amount > 0 ? 'income' : 'expense',
                        name: data.name,
                        amount: Math.abs(data.amount).toString(),
                        date: new Date(data.date), // Convert SQLite string back to Date object
                        time: timePart,
                        category: data.category,
                        description: data.details
                    }
                )

                const typeObj = this.types.find(t => t.id === (data.amount > 0 ? 'income' : 'expense'))
                this.selectedType.set(typeObj)

                this.selectedCurrency.set(this.currencies[0])

            } else {
                this.reset()
            }
        })
    }

    public form = this._fb.group({
        type: ['', Validators.required],
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
        amount: ['', [Validators.required, Validators.min(0), numericValidator]],
        date: [this._now, []],
        time: [this._currentTime, []],
        currency: ['ron', []],
        category: ['', []],
        description: ['', [Validators.maxLength(100)]],
    })


    public types = [
        {
            id: 'income',
            title: 'Income',
        },
        {
            id: 'expense',
            title: 'Expense',
        },
    ]

    selectedType = signal<typeof this.types[0] | undefined>(undefined)

    public currencies = [
        {
            id: 'ron',
            title: 'RON',
            icon: 'RON'
        },
        {
            id: 'eur',
            title: 'EUR',
            icon: '€'
        },
        {
            id: 'usd',
            title: 'USD',
            icon: '$'
        },
    ]

    public minDate = new Date(2005, 0, 1)
    public maxDate = new Date(2040, 11, 31)

    public selectedCurrency = signal(this.currencies[0])

    public selectCurrency(currency: typeof this.currencies[0]) {
        this.selectedCurrency.set(currency)
        this.form.get('currency')?.setValue(currency.id)
    }

    public selectType(type: typeof this.types[0]) {
        this.selectedType.set(type)
        this.form.get('type')?.setValue(type.id)
    }

    isIncomeSelected(id: string): boolean {
        return id === 'income' && this.form.get('type')?.value === 'income';
    }

    submit(ctx: any) {
        if (this.form.invalid) {
            this.form.markAllAsTouched()
            return;
        }

        const { name, amount, type, date, time, category, description } = this.form.getRawValue()

        let isoDateTime = ''
        if (date && time) {
            const datePart = new Date(date.setHours(4)).toISOString().split('T')[0] // "yyyy-MM-dd"
            isoDateTime = `${datePart} ${time}.000` // ISO8601 datetime
        }


        const numericAmount = Number(amount)
        console.log(numericAmount)
        const signedAmount = type === 'income' ? numericAmount : -numericAmount
        console.log(signedAmount)

        const existingTransaction = this.transaction();

        const userTransaction: Transaction = {
            id: existingTransaction? existingTransaction.id : crypto.randomUUID(),
            date: isoDateTime,
            name: name || '',
            amount: signedAmount,
            category: category || '',
            transaction_status: "COMPLETED",
            details: description || '',
        }

        if (existingTransaction) {
            this.service.updateTransactionFromModal(userTransaction)

            toast.success('Transaction Updated', {
                description: `${userTransaction.name} has been modified successfully.`
            })

        } else {
            this.service.addTransaction(userTransaction)

            toast.success('Transaction Recorded', {
                description: `${userTransaction.name} has been added to your history.`
            })
        }

        this.closeSheet(ctx)
    }

    open(transaction: Transaction | null) {
        this.transaction.set(transaction)
        this.sheetRef()?.open();
        this.setToNow()
    }

    setToNow() {
        this._now = new Date()
        this._currentTime = this._now.toTimeString().split(' ')[0]
        this.form.patchValue({
            date: this._now,
            time: this._currentTime
        })
    }

    closeSheet(ctx: any) {
        ctx.close()
        this.sheetRef()?.close({})
        this.transaction.set(null);
        this.reset();
    }

    reset() {
        this.selectedCurrency.set(this.currencies[0])
        this.selectedType.set(undefined)
        this.form.reset({
            date: this._now,
            time: this._currentTime,
            currency: this.selectedCurrency().id
        });

        this.form.markAsPristine()
        this.form.markAsUntouched()
    }

}
