import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {HlmSidebarImports} from '@spartan-ng/helm/sidebar';
import {SiteHeader} from './sidebar-inset/site-header/site-header';
import {AppSidebarInset} from './sidebar-inset/app-sidebar-inset/app-sidebar-inset';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'sidebar-inset-page',
    imports: [HlmSidebarImports, SiteHeader, AppSidebarInset, RouterOutlet],
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
