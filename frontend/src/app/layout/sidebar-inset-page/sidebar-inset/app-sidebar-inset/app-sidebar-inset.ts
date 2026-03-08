import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCommand } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HlmButton} from '@spartan-ng/helm/button';
// import { data } from '../../shared/sidebar/data';
// import { NavMain } from '../../shared/sidebar/nav-main';
// import { NavProjects } from '../../shared/sidebar/nav-projects';
// import { NavSecondary } from '../../shared/sidebar/nav-secondary';
// import { NavUser } from '../../shared/sidebar/nav-user';

@Component({
    selector: 'spartan-app-sidebar-inset',
    // imports: [HlmSidebarImports, NgIcon, NavMain, NavProjects, NavUser, NavSecondary],
    imports: [HlmSidebarImports, NgIcon, RouterOutlet, RouterLink, HlmButton],
    providers: [provideIcons({ lucideCommand })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'app-sidebar-inset.html',
    styleUrl: 'app-sidebar-inset.css'
})
export class AppSidebarInset {
    // public readonly data = data;
}
