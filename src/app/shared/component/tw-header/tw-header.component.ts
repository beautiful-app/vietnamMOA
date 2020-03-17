import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lang} from '../../const/language.const';

@Component({
    selector: 'tw-header',
    templateUrl: './tw-header.component.html',
    styleUrls: ['./tw-header.component.scss'],
})
export class TwHeaderComponent implements OnInit {
    
    @Input() title: any;
    @Input() backButton: boolean = true;
    @Input() buttonTitle: string = Lang.Lang_910;
    @Input() showButtonRight: boolean = false;
    @Output() buttonAction = new EventEmitter();
    @Input() showLoadingButtonRight: boolean = false;
    
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    actionEmit() {
        this.buttonAction.emit();
    }
}
