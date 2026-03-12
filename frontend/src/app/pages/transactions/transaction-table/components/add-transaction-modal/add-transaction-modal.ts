import {Component, HostListener, inject, signal, viewChild} from '@angular/core';
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
import {Transaction, TransactionStatus} from '../../services/transactions-model';
import {numericValidator} from '../../validators/numeric-validator';
import {HlmAlertDialogImports} from '@spartan-ng/helm/alert-dialog';
import {BrnSheet} from '@spartan-ng/brain/sheet';
import {HlmComboboxImports} from '@spartan-ng/helm/combobox';
import {HlmTooltipImports} from '@spartan-ng/helm/tooltip';

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
        HlmSelectImports,
        BrnSelect,
        HlmDatePickerImports,
        HlmAlertDialogImports,
        HlmComboboxImports,
        HlmTooltipImports
    ],
    providers: [provideIcons({lucideCross, lucideChevronDown, lucideRotateCw, lucideCalendar1})],
    templateUrl: './add-transaction-modal.html',
    styleUrl: './add-transaction-modal.css',
})
export class AddTransactionModal {

    public readonly sheetRef = viewChild(BrnSheet);

    //TODO I reverted back the logic for the ESC button so that I can take care of the animation.
    // I should revisit this in the future

    // public isAlertOpen = signal(false);
    //
    // @HostListener('document:mousedown', ['$event'])
    // onGlobalClick(event: MouseEvent) {
    //     const target = event.target as HTMLElement;
    //
    //     const backdrops = document.querySelectorAll('.cdk-overlay-backdrop');
    //
    //     if (backdrops.length > 1) {
    //         return;
    //     }
    //
    //     const isOverlay = target.classList.contains('cdk-overlay-backdrop');
    //
    //     if (isOverlay) {
    //         this.isAlertOpen.set(true);
    //     }
    // }


    private readonly _fb = inject(FormBuilder);
    private readonly now = new Date();
    private readonly currentTime = this.now.toTimeString().split(' ')[0];

    private readonly service = inject(TransactionsService)
    protected categories = new Set(this.service.getTransactions()().map((item) => item.category))

    public form = this._fb.group({
        type: ['', Validators.required],
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
        amount: ['', [Validators.required, Validators.min(0), numericValidator]],
        date: [this.now, []],
        time: [this.currentTime, []],
        currency: ['ron', []],
        category: ['', []],
        description: ['', [Validators.maxLength(100)]],
    }, {updateOn: 'submit'});


    public types = [
        {
            id: 'income',
            title: 'Income',
            description: 'Piure cu carnita :)',
        },
        {
            id: 'expense',
            title: 'Expense',
            description: 'Piure fara carnita :(',
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

    public minDate = new Date(2005, 0, 1);
    public maxDate = new Date(2030, 11, 31);

    public selectedCurrency = signal(this.currencies[0]);

    public selectCurrency(currency: typeof this.currencies[0]) {
        this.selectedCurrency.set(currency);
        this.form.get('currency')?.setValue(currency.id);
    }

    public selectType(type: typeof this.types[0]) {
        this.selectedType.set(type)
        this.form.get('type')?.setValue(type.id);
    }

    isIncomeSelected(id: string): boolean {
        return id === 'income' && this.form.get('type')?.value === 'income';
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        console.log(this.form.value);

        const {date, time} = this.form.value;
        let isoDateTime = ''
        if (date && time) {
            const datePart = date.toISOString().split('T')[0]; // "yyyy-MM-dd"
            isoDateTime = `${datePart} ${time}.000`; // ISO8601 datetime
        }

        const {amount, type} = this.form.getRawValue();

        const numericAmount = Number(amount);
        const signedAmount = type === 'income' ? numericAmount : -numericAmount;

        const userTransaction: Transaction = {
            id: Math.random().toString(),
            date: isoDateTime,
            name: this.form.value.name ? this.form.value.name : '',
            amount: signedAmount,
            category: this.form.value.category ? this.form.value.category : '',
            transaction_status: "COMPLETED",
            details: this.form.value.description ? this.form.value.description : '',
        }

        console.log(userTransaction)

    }

    setToNow() {
        const now = new Date();
        const currentTime = now.toTimeString().split(' ')[0];
        this.form.patchValue({
            date: now,
            time: currentTime
        });
    }

    closeSheet(ctx: any) {
        ctx.close();
        this.sheetRef()?.close({});
        this.reset()
    }

    //TODO: although there are three ways that all trigger alert, there is a fourth one that doesn't: the ESC
    // so, fix it

    //TODO: add logic so that the alert only pops up when the form is dirty. If it's pristine, we don't need any alert.

    reset() {
        this.selectedCurrency.set(this.currencies[0])
        this.selectedType.set(undefined)
        this.form.reset({
            date: this.now,
            time: this.currentTime,
            currency: this.selectedCurrency().id
        });

    }


}
