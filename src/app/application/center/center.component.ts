import {Component, OnInit} from '@angular/core';
import {USER} from 'src/app/shared/entity/user.bo';
import {UserService} from '../../shared/service/user.service';

@Component({
    selector: 'app-center',
    templateUrl: './center.component.html',
    styleUrls: ['./center.component.scss'],
})
export class CenterComponent implements OnInit {
    username: string;
    department: string;
    avatar: string;
    
    constructor(
        private userSV: UserService
    ) {
    }
    
    ngOnInit() {
        // this.userSV.getUserFromStorage().subscribe(r => {
        this.username = USER.get().username;
        this.avatar = USER.get().avatar;
        this.department = USER.get().department;
        console.log(USER.get());
        // });
    }
    
}
