import { ComponentFixture, TestBed } from '@angular/core/testing';

import SidebarInsetPage from './sidebar-inset-page';

describe('SidebarInsetPage', () => {
    let component: SidebarInsetPage;
    let fixture: ComponentFixture<SidebarInsetPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SidebarInsetPage],
        }).compileComponents();

        fixture = TestBed.createComponent(SidebarInsetPage);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
