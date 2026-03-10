import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    lucideCircle,
    lucideCircleCheckBig,
    lucideCircleDashed,
    lucideCircleDot,
    lucideCircleHelp,
    lucideCircleOff,
} from '@ng-icons/lucide';

import { HlmIcon } from '@spartan-ng/helm/icon';
import { type CellContext, injectFlexRenderContext } from '@tanstack/angular-table';
import {Transaction} from '../services/transactions-model';
import {StatusIconPipe} from '../pipes/status-icon-pipe';

@Component({
    selector: 'spartan-status-icon-cell',
    imports: [StatusIconPipe, NgIcon, HlmIcon, StatusIconPipe],
    providers: [
        provideIcons({
            lucideCircle,
            lucideCircleDot,
            lucideCircleDashed,
            lucideCircleOff,
            lucideCircleCheckBig,
            lucideCircleHelp, // Default icon if not recognized
        }),
    ],
    template: `
		<div class="flex items-center rounded-md border px-2.5 py-1 text-xs font-semiboldn w-fit">
			<ng-icon hlm class="text-muted-foreground mr-2" size="sm" [name]="_element.transaction_status | statusIcon" />
			{{ _element.transaction_status }}
		</div>
	`,
})
export class StatusIconCell {
    private readonly _context = injectFlexRenderContext<CellContext<Transaction, unknown>>();
    protected readonly _element = this._context.row.original;
}
