import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HlmButton} from '@spartan-ng/helm/button';
import {HlmDateRangePicker} from '@spartan-ng/helm/date-picker';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideRefreshCw} from '@ng-icons/lucide';
import {HlmIcon} from '@spartan-ng/helm/icon';

@Component({
    selector: 'cal-date-picker-range',
    imports: [HlmDateRangePicker, ReactiveFormsModule, HlmButton, HlmIcon, NgIcon],
    providers: [provideIcons({lucideRefreshCw})],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'flex justify-center bg-surface overflow-auto',
    },
    template: `
        <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-8">
            <div class="flex flex-row gap-2">
                <hlm-date-range-picker
                    buttonId="dateRange"
                    [min]="minDate"
                    [max]="maxDate"
                    formControlName="range"
                    [autoCloseOnEndSelection]="true"
                    class="h-8"
                >
                    <span>Enter a date range</span>
                </hlm-date-range-picker>
                <button type="submit" hlmBtn class="h-8" [disabled]="form.invalid || form.pristine"><ng-icon hlm name="lucideRefreshCw" size="sm"/></button>
            </div>


        </form>
    `,
})
export class CalendarDatePickerRangeComponent {
    private readonly _formBuilder = inject(FormBuilder);

    public form = this._formBuilder.group({
        range: [[], [Validators.required]],
    });

    /** The minimum date */
    public minDate = new Date(2023, 0, 1);

    /** The maximum date */
    public maxDate = new Date(2030, 11, 31);

    submit() {
        console.log(this.form.value); //TODO update this to query the backend with the user-provided range
        this.form.get('range')?.markAsPristine();
    }

    constructor() {
        this.form.get('range')?.valueChanges.subscribe(console.log);
    }
}
