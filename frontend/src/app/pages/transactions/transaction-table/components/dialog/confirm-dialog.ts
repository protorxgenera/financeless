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
        <hlm-dialog-header hlmAlertDialogHeader>
            <h2 hlmAlertDialogTitle>{{ context.title || 'Are you sure?' }}</h2>
        </hlm-dialog-header>
        <div class="pt-2 pb-4">
            <p hlmAlertDialogDescription>{{ context.message }}</p>
        </div>

        <hlm-dialog-footer hlmAlertDialogFooter>
            <button hlmAlertDialogCancel (click)="dialogRef.close(false)">Cancel</button>
            <button hlmAlertDialogAction variant="destructive" (click)="dialogRef.close(true)">Delete</button>
        </hlm-dialog-footer>
    `
})
export class ConfirmDialog {
    protected readonly dialogRef = inject(BrnDialogRef);
    protected readonly context = injectBrnDialogContext<{title: string, message: string}>();
}
