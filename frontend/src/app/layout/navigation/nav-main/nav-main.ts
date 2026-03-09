import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {
    lucideBookOpen,
    lucideBot, lucideChartNoAxesColumn,
    lucideChevronRight,
    lucideGauge, lucideHistory,
    lucideSettings2,
    lucideSquareTerminal
} from '@ng-icons/lucide';
import {NgIcon, provideIcons} from '@ng-icons/core';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'nav-main',
    imports: [HlmSidebarImports, NgIcon, HlmCollapsibleImports, RouterLink],
    providers: [provideIcons({ lucideGauge, lucideHistory, lucideChartNoAxesColumn, lucideSettings2 })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './nav-main.html',
    styleUrl: './nav-main.css',
})
export class NavMain {

    public readonly items = input.required<
        {
            title: string;
            url: string;
            icon: string;
            isActive?: boolean;
            items?: {
                title: string;
                url: string;
            }[];
        }[]
    >();

}
