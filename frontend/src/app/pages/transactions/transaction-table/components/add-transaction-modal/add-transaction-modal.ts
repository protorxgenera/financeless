import { Component } from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideCross} from '@ng-icons/lucide';
import {HlmSheetImports} from '@spartan-ng/helm/sheet';
import {HlmLabelImports} from '@spartan-ng/helm/label';
import {HlmInputImports} from '@spartan-ng/helm/input';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {HlmIcon} from '@spartan-ng/helm/icon';

@Component({
    selector: 'add-transaction-modal',
    imports: [
        HlmSheetImports,
        HlmLabelImports,
        HlmInputImports,
        HlmButtonImports,
        HlmIcon,
        NgIcon
    ],
    providers: [provideIcons({ lucideCross })],
    templateUrl: './add-transaction-modal.html',
    styleUrl: './add-transaction-modal.css',
})
export class AddTransactionModal {}
