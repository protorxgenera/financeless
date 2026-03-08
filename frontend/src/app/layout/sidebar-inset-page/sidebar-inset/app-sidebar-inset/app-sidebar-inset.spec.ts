import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSidebarInset } from './app-sidebar-inset';

describe('AppSidebarInset', () => {
    let component: AppSidebarInset;
    let fixture: ComponentFixture<AppSidebarInset>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppSidebarInset],
        }).compileComponents();

        fixture = TestBed.createComponent(AppSidebarInset);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
