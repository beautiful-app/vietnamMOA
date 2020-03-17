import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'tw-load-complete',
    templateUrl: './tw-load-complete.component.html',
    styleUrls: ['./tw-load-complete.component.scss'],
})
export class TwLoadCompleteComponent implements OnInit {
    @Input() isShow: any;
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
}
