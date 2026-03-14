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
import {HlmBadgeImports} from '@spartan-ng/helm/badge';

@Component({
    selector: 'spartan-status-icon-cell',
    imports: [StatusIconPipe, NgIcon, HlmIcon, StatusIconPipe, HlmBadgeImports],
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
            <span
                id="{{ _element.id }}-status"
                hlmBadge
                variant="outline"
                class="text-muted-foreground rounded-full px-1.5 text-xs"
            >
			<ng-icon hlm size="xs" [name]="_element.transaction_status | statusIcon" />
			{{ _element.transaction_status }}
		</span>
	`,
})
export class StatusIconCell {
    private readonly _context = injectFlexRenderContext<CellContext<Transaction, unknown>>();
    protected readonly _element = this._context.row.original;
}
