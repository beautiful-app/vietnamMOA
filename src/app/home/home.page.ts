import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ToastController} from '@ionic/angular';
import {select, Store} from '@ngrx/store';
import {USER} from '../shared/entity/user.bo';
import {UserService} from '../shared/service/user.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    
    title = 'aa';
    count$: any;
    
    constructor(private router: Router,
                private translate: TranslateService,
                public toastController: ToastController,
                private store: Store<{ user: 'user' }>,
                private userSV: UserService
    ) {
        this.store.pipe<any>(select('user')).subscribe(() => {
            console.log('用户信息更新啦:', USER.get());
        });
    }
    
    ngOnInit() {
        this.title = this.translate.getBrowserCultureLang();
    }
    
    selectLanguage(lang: string) {
        this.title = this.translate.getBrowserLang().substr(0, 2);
        this.translate.use(lang);
    }
    
    increment() {
        // this.store.dispatch(userInfoUpddate());
        this.userSV.getUserFromStorage().subscribe();
    }
    
    decrement() {
    }
    
    reset() {
    }
    
}
