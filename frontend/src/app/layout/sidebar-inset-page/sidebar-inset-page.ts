import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {HlmSidebarImports} from '@spartan-ng/helm/sidebar';
import {SiteHeader} from './sidebar-inset/site-header/site-header';
import {AppSidebarInset} from './sidebar-inset/app-sidebar-inset/app-sidebar-inset';

@Component({
    selector: 'spartan-sidebar-inset',
    imports: [HlmSidebarImports, SiteHeader, AppSidebarInset],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'block',
    },
    styleUrl: './sidebar-inset-page.css',
    templateUrl: './sidebar-inset-page.html',
})
export default class SidebarInsetPage {
}
