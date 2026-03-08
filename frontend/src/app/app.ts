import {Component, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HlmButton} from '@spartan-ng/helm/button';
import SidebarInsetPage from './layout/sidebar-inset-page/sidebar-inset-page';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, HlmButton, SidebarInsetPage],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {

}
