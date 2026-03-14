import {Component, inject} from '@angular/core';
import {HlmDialogImports} from '@spartan-ng/helm/dialog';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {BrnDialogRef, injectBrnDialogContext} from '@spartan-ng/brain/dialog';
import {HlmAlertDialogImports} from '@spartan-ng/helm/alert-dialog';

@Component({
    selector: 'confirm-dialog',
    standalone: true,
    imports: [HlmDialogImports, HlmButtonImports, HlmAlertDialogImports],
    template: `
                <hlm-alert-dialog-header>
                    <h2 hlmAlertDialogTitle>{{ context.title || 'Are you sure?' }}</h2>
                    <p hlmAlertDialogDescription>{{ context.message }}</p>
                </hlm-alert-dialog-header>
                <hlm-alert-dialog-footer>
                    <button hlmAlertDialogCancel (click)="dialogRef.close(false)">Cancel</button>
                    <button hlmAlertDialogAction (click)="dialogRef.close(true)">Confirm</button>
                </hlm-alert-dialog-footer>
    `
})
export class ConfirmDialog {
    protected readonly dialogRef = inject(BrnDialogRef);
    protected readonly context = injectBrnDialogContext<{title: string, message: string}>();
}
