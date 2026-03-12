import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { toast } from 'ngx-sonner';

@Component({
    selector: 'submit-sonner',
    imports: [HlmToasterImports, HlmButtonImports],
    template: `
		<hlm-toaster />
		<button hlmBtn variant="outline" (click)="showToast()">Show Toast</button>
	`,
})
export class SuccessSonner {
    showToast() {
        toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
            },
        });
    }
}
