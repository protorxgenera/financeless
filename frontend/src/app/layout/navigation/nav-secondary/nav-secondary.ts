import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {provideIcons} from '@ng-icons/core';
import {lucideLifeBuoy, lucideSend, lucideSettings2} from "@ng-icons/lucide";
import {HlmSidebarImports} from '@spartan-ng/helm/sidebar';
import {HlmIconImports} from '@spartan-ng/helm/icon';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'nav-secondary',
    imports: [
        HlmSidebarImports,
        HlmIconImports,
        RouterLink
    ],
    providers: [provideIcons({ lucideSettings2 })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './nav-secondary.html',
    styleUrl: './nav-secondary.css',
})
export class NavSecondary {

    public readonly items = input.required<
        {
            title: string;
            url: string;
            icon: string;
        }[]
    >();

}
