import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/service/user.service';
import {USER} from '../../shared/entity/user.bo';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {NavController} from '@ionic/angular';
import {Lang} from '../../core/singleton.export';

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
                private navCtrl: NavController
    ) {
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
    
    changeInfo() {
        this.router.navigate(['./']);
        
    }
    
    go() {
        
        // console.log('lang', Lang);
        Lang.lang_32 = 'dkfjkdjfldaskf经会计师的咖啡店';
        for (let langKey in Lang) {
            console.log('langey', langKey);
            console.log(Lang[langKey]);
        }
        // this.navCtrl.back();
        
    }
}
