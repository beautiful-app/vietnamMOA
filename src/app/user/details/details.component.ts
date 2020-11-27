import {Component, OnInit} from '@angular/core';
import {USER} from '../../shared/entity/user.bo';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
    user: USER;
    
    
    constructor() {
    }
    
    ngOnInit() {
        this.user = USER.get();
    }
}
