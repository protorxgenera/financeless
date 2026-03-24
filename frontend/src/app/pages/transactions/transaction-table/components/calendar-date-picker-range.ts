import {ChangeDetectionStrategy, Component, inject, output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HlmButton} from '@spartan-ng/helm/button';
import {HlmDateRangePicker} from '@spartan-ng/helm/date-picker';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideCalendarRange, lucideX} from '@ng-icons/lucide';
import {HlmIcon} from '@spartan-ng/helm/icon';
import {StatusIconPipe} from '../pipes/status-icon-pipe';

@Component({
    selector: 'cal-date-picker-range',
    imports: [HlmDateRangePicker, ReactiveFormsModule, HlmButton, HlmIcon, NgIcon, StatusIconPipe],
    providers: [provideIcons({lucideX, lucideCalendarRange})],
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
                @if (!form.pristine) {
                    <button type="reset" hlmBtn variant="ghost" class="h-8" [disabled]="form.invalid || form.pristine">
                        <ng-icon hlm name="lucideX" size="sm"/>
                    </button>
                }
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

    providedDate = output<Date[] | undefined>()

    submitProvidedDate(dateRange: Date[] | null) {
        if (dateRange) {
            this.providedDate.emit(dateRange)
        } else {
            this.providedDate.emit(undefined)
        }
        console.log(dateRange)
    }

    // this method isn't used anymore because we listen to the (submit) event through the observable, not through the button type="submit"
    // I might return to this later, when the time comes for API calls
    submit() {
        console.log(this.form.value); //TODO update this to query the backend with the user-provided range
        this.form.get('range')?.markAsPristine();
    }

    constructor() {
        this.form.get('range')?.valueChanges.subscribe({
            next: (val) => this.submitProvidedDate(val)
        });
    }
}
