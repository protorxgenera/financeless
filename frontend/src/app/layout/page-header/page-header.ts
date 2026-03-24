import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {data} from '../data';

@Component({
    selector: 'page-header',
    imports: [],
    templateUrl: './page-header.html',
    styleUrl: './page-header.css',
})
export class PageHeader {

    protected route = inject(ActivatedRoute);
    protected user = data.user;

}
