import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private translate: TranslateService
    ) {
        this.initializeApp();
    }
    
    
    
    initializeApp() {
        this.platform.ready().then(() => {
            // this.statusBar.overlaysWebView(true);
            this.statusBar.styleBlackTranslucent();
            // this.userSV.getUserFromStorage().subscribe(r => {
            //     if(r) console.log(USER.get());
            //     // console.log(USER.get().id);
            //     this.router.navigate(['/tabs/center']);
            //
            // });
            
            
            // this.splashScreen.hide();
        });
        
        // console.log(this.translate.getBrowserCultureLang());
        // // 当在assets/i18n中找不到对应的语言翻译时，使用'zh-CN'作为默认语言
        // this.translate.setDefaultLang('cn');
        // this.translate.use('cn');
    }
}
