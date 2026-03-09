import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideCommand} from '@ng-icons/lucide';
import {
    HlmSidebar,
    HlmSidebarContent,
    HlmSidebarFooter,
    HlmSidebarHeader,
    HlmSidebarMenu,
    HlmSidebarMenuButton,
    HlmSidebarMenuItem,
    HlmSidebarWrapper
} from '@spartan-ng/helm/sidebar';
import {data} from '../../../data';
import {NavUser} from '../../../navigation/nav-user/nav-user';
import {NavMain} from '../../../navigation/nav-main/nav-main';
import {NavSecondary} from '../../../navigation/nav-secondary/nav-secondary';

@Component({
    selector: 'site-sidebar',
    imports: [
        HlmSidebar,
        HlmSidebarContent,
        HlmSidebarFooter,
        HlmSidebarHeader,
        HlmSidebarMenu,
        HlmSidebarMenuButton,
        HlmSidebarMenuItem,
        HlmSidebarWrapper,
        NgIcon,
        NavUser,
        NavMain,
        NavSecondary
    ],
    providers: [provideIcons({ lucideCommand })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './site-sidebar.html',
    styleUrl: './site-sidebar.css',
})
export class SiteSidebar {
    public readonly data = data;
}
