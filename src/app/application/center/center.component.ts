import {Component, OnInit} from '@angular/core';
import {USER} from 'src/app/shared/entity/user.bo';
import {UserService} from '../../shared/service/user.service';
import {Store, select} from '@ngrx/store';
import {RouterService} from '../../shared/service/router.service';


@Component({
    selector: 'app-center',
    templateUrl: './center.component.html',
    styleUrls: ['./center.component.scss'],
})
export class CenterComponent implements OnInit {
    username: string;
    department: string;
    avatar: string;
    newMark: boolean = false;
    
    constructor(
        private userSV: UserService,
        private store: Store<{ user: 'user', newVersion: 'newVersion' }>,
        private routerSV: RouterService,
    ) {
    
    }
    
    ngOnInit() {
        this.store.pipe(select('user')).subscribe(r => {
            this.username = USER.get().username;
            this.avatar = USER.get().avatar;
            this.department = USER.get().department;
        });
        
        this.store.pipe(select('newVersion')).subscribe(r => {
            this.newMark = Boolean(r);
        });
        
    }
    
    loginOut() {
        this.userSV.loginOut();
    }
}
