import {Component, OnInit} from '@angular/core';
import {USER} from 'src/app/shared/entity/user.bo';
import {UserService} from '../../shared/service/user.service';
import {Store, select} from '@ngrx/store';
import {RouterService} from '../../shared/service/router.service';
import {WHERE} from '../../shared/entity/where.enum';


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
        private storeSV: Store<{ user: 'user' }>,
        private routerSV: RouterService
    ) {
    
    }
    
    ngOnInit() {
        this.storeSV.pipe(select('user')).subscribe(r => {
            this.username = USER.get().username;
            this.avatar = USER.get().avatar;
            this.department = USER.get().department;
        });
    }
    
    loginOut() {
        this.userSV.clearData();
        this.routerSV.to(WHERE.login);
    }
}
