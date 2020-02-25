import {Component, OnInit} from '@angular/core';
import {USER} from 'src/app/shared/entity/user.bo';
import {UserService} from '../../shared/service/user.service';
import {Store, select} from '@ngrx/store';


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
        private userSV: UserService,
        private storeSV: Store<{ user: 'user' }>
    ) {
    }
    
    ngOnInit() {
        this.storeSV.pipe(select('user')).subscribe(r => {
            this.username = USER.get().username;
            this.avatar = USER.get().avatar;
            this.department = USER.get().department;
        });
    }
}
