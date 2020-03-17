import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/service/user.service';
import {USER} from '../../shared/entity/user.bo';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {NavController} from '@ionic/angular';
import {DeviceService} from '../../shared/service/device.service';
import {select, Store} from '@ngrx/store';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
    avatar: string;
    username: string;
    gender: string;
    cellphone: string;
    email: string;
    jobTitle: string;
    department: string;
    
    
    constructor(private userSV: UserService,
                private router: Router,
                private location: Location,
                private navCtrl: NavController,
                private deviceSV: DeviceService,
                private store: Store<{ user: 'user', newVersion: 'newVersion' }>,
    ) {
    }
    
    ngOnInit() {
        this.store.pipe(select('user')).subscribe(_ => {
            this.avatar = USER.get().avatar;
            this.username = USER.get().username;
            this.gender = USER.get().gender;
            this.email = USER.get().email;
            this.cellphone = USER.get().cellphone;
            this.jobTitle = USER.get().jobTitle;
            this.department = USER.get().department;
        });
        
    }
    
    changeInfo() {
        this.router.navigate(['./']);
    }
    
    go() {
        
        this.deviceSV.openUrlInNaviteBrowser('http://baidu.com');
    }
}
