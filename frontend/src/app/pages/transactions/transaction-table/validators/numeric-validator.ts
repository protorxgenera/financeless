import { AbstractControl, ValidationErrors } from '@angular/forms';

export function numericValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === '') return null;
    return isNaN(Number(value)) ? { 'notANumber': true } : null;
}
