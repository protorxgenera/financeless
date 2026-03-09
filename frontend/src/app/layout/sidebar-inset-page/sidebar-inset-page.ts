import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {HlmSidebarImports} from '@spartan-ng/helm/sidebar';
import {SiteHeader} from './sidebar-inset/site-header/site-header';
import {RouterOutlet} from '@angular/router';
import {SiteSidebar} from './sidebar-inset/site-sidebar/site-sidebar';
import {PageHeader} from '../page-header/page-header';

@Component({
    selector: 'sidebar-inset-page',
    imports: [HlmSidebarImports, SiteHeader, RouterOutlet, SiteSidebar, PageHeader],
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
