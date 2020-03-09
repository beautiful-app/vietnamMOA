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
import {HttpInterceptor} from './interceptor/http.interceptor';
import {select, Store, StoreModule} from '@ngrx/store';
import {_userReducer} from './ngrx/reducers/user.reducer';
import {UpgradeModule} from '../application/upgrade/upgrade.module';
import {UpgradeService} from '../application/upgrade/upgrade.service';
import {_downloadApkReducer} from './ngrx/reducers/application.reducer';
import {StorageService} from '../shared/service/storage.service';
import {LanguageService} from '../shared/service/language.service';
import {RouterService} from '../shared/service/router.service';
import {WHERE} from '../shared/entity/where.enum';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        TranslateModule.forRoot(translateModuleConfig()),
        StoreModule.forRoot({downloadApk: _downloadApkReducer, user: _userReducer}),
        UpgradeModule
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
                private storageSV: StorageService,
                private storeSV: Store<{ user: 'user' }>,
                private upgradeSV: UpgradeService,
                private languageSV: LanguageService,
                private routerSV: RouterService
    ) {
        console.log('core模块执行');
        if(parent) throw new Error('模块已经存在，不能再次加载');
        
        // 注入svg图片
        loadSvgResources(ir, ds);
        
        // 语言设置
        this.languageSV.languageSettings();
        
        // 获取用户信息
        this.userSV.getUserFromStorage().subscribe(r => {
            console.log('huoqudaode:', r);
            if(r)
            // 通过token查询用户信息,此步骤也作为token验证是否过期的目的
                this.userSV.getUserInfoByToken().subscribe();
            else this.routerSV.to(WHERE.login);
        });
        
        // 设置user信息变化的监听,如果有变化就更新缓存里的值
        this.storeSV.pipe(select('user')).subscribe(_ => {
            this.storageSV.storageUserInfo().subscribe();
        });
        
    }
}

