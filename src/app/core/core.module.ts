import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {loadSvgResources} from './svg.util';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {translateModuleConfig} from './HttpLoaderFactory';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {UserService} from '../shared/service/user.service';
import {Storage} from '@ionic/storage';
import {HttpInterceptor} from './interceptor/http.interceptor';
import {_counterReducer} from './ngrx/reducers/counter.reducer';
import {StoreModule} from '@ngrx/store';
import {_userReducer} from './ngrx/reducers/user.reducer';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        TranslateModule.forRoot(translateModuleConfig()),
        StoreModule.forRoot({count: _counterReducer, user: _userReducer})
    ],
    exports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptor,
            multi: true
        }
    ]
    
})
export class CoreModule {
    // 两个注解是防止循环调用和第一次的时候可以调用
    constructor(@Optional() @SkipSelf() parent: CoreModule,
                ir: MatIconRegistry,
                ds: DomSanitizer,
                private translate: TranslateService,
                private platform: Platform,
                private router: Router,
                private userSV: UserService,
                private storage: Storage,
    ) {
        console.log('core模块执行');
        if(parent) throw new Error('模块已经存在，不能再次加载');
        
        loadSvgResources(ir, ds);
        // 语言初始化(若未设置语言, 则取浏览器语言)
        // // 当在assets/i18n中找不到对应的语言翻译时，使用'zh-CN'作为默认语言
        this.translate.setDefaultLang('zh');
        let language = this.translate.getBrowserLang();
        this.translate.use(language.substr(0, 2));
        
        // 获取用户信息
        this.userSV.getUserFromStorage().subscribe();
    }
}

