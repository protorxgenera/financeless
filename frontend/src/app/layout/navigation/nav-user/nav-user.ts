import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {HlmIconImports} from '@spartan-ng/helm/icon';
import {HlmSidebarImports, HlmSidebarService} from '@spartan-ng/helm/sidebar';
import {
    HlmDropdownMenu,
    HlmDropdownMenuGroup,
    HlmDropdownMenuItem,
    HlmDropdownMenuLabel,
    HlmDropdownMenuSeparator,
    HlmDropdownMenuTrigger
} from '@spartan-ng/helm/dropdown-menu';
import {HlmAvatarImports} from '@spartan-ng/helm/avatar';
import {provideIcons} from '@ng-icons/core';
import {
    lucideBadgeCheck,
    lucideBell,
    lucideChevronsUpDown,
    lucideCreditCard,
    lucideLogOut,
    lucideSparkles
} from '@ng-icons/lucide';

@Component({
    selector: 'nav-user',
    imports: [
        HlmIconImports,
        HlmSidebarImports,
        HlmDropdownMenu,
        HlmDropdownMenuTrigger,
        HlmDropdownMenuLabel,
        HlmDropdownMenuSeparator,
        HlmDropdownMenuGroup,
        HlmDropdownMenuItem,
        HlmAvatarImports
    ],
    providers: [
        provideIcons({
            lucideChevronsUpDown,
            lucideSparkles,
            lucideBadgeCheck,
            lucideCreditCard,
            lucideBell,
            lucideLogOut,
        }),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './nav-user.html',
    styleUrl: './nav-user.css',
})
export class NavUser {

    private readonly _sidebarService = inject(HlmSidebarService);
    protected readonly _menuSide = computed(() => (this._sidebarService.isMobile() ? 'top' : 'right'));


    public readonly user = input.required<{
        name: string;
        email: string;
        avatar: string;
    }>();

}
