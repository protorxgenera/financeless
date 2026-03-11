import {Component, inject, signal} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideChevronDown, lucideCross, lucideRotateCw} from '@ng-icons/lucide';
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
        HlmDatePickerImports
    ],
    providers: [provideIcons({lucideCross, lucideChevronDown, lucideRotateCw})],
    templateUrl: './add-transaction-modal.html',
    styleUrl: './add-transaction-modal.css',
})
export class AddTransactionModal {

    private readonly _fb = inject(FormBuilder);

    private readonly service = inject(TransactionsService)
    protected categories = new Set(this.service.getTransactions()().map((item) => item.category))

    public form = this._fb.group({
        type: ['', Validators.required],
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
        amount: ['', [Validators.required]],
        date: ['', []],
        time: ['', []],
        currency: ['', []],
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
        console.log(this.selectedType());
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        console.log(this.form.value);
    }

    reset() {
        this.form.reset()
        this.selectedType.set(undefined)
    }


}

//TODO continue building the AddTransactionForm inside the modal
// for the status (and maybe income/expense too) you can use the radio buttons that look hot in spartan:
// https://spartan.ng/components/radio-group
