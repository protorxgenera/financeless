import {Component} from '@angular/core';
import {HlmToasterImports} from '@spartan-ng/helm/sonner';
import {toast} from 'ngx-sonner';

//TODO cleanup needed af

@Component({
    selector: 'submit-sonner',
    imports: [HlmToasterImports],
    template: `
        <hlm-toaster/>
        <!-- <button hlmBtn variant="outline" (click)="showToast()">Show Toast</button> -->
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
