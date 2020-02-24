import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/service/user.service';
import {USER} from '../../shared/entity/user.bo';

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
    
    
    constructor(private userSV: UserService) {
    }
    
    ngOnInit() {
        // this.userSV.getUserFromStorage().subscribe(r => {
        this.avatar = USER.get().avatar;
        this.username = USER.get().username;
        this.gender = USER.get().gender;
        this.email = USER.get().email;
        this.cellphone = USER.get().cellphone;
        this.jobTitle = USER.get().jobTitle;
        this.department = USER.get().department;
        console.log('用户详情初始化时:', USER.get());
        // });
    }
    
}
