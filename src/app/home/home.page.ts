import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ToastController} from '@ionic/angular';
import {Store, select} from '@ngrx/store';
import {increment, decrement, reset} from '../core/ngrx/actions/counter.actions';
import {USER} from '../shared/entity/user.bo';

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
                private store: Store<{ count: 'count' }>
    ) {
        store.pipe(select('count')).subscribe(r => {
            console.log(r);
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
        this.store.dispatch(increment({user: USER.get()}));
    }
    
    decrement() {
        this.store.dispatch(decrement());
    }
    
    reset() {
        this.store.dispatch(reset());
    }
    
    
}
