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
import {_userLogoutReducer, _userReducer} from './ngrx/reducers/user.reducer';
import {_downloadApkReducer, _newVersion} from './ngrx/reducers/application.reducer';
import {StorageService} from '../shared/service/storage.service';
import {LanguageService} from '../shared/service/language.service';
import {RouterService} from '../shared/service/router.service';
import {WHERE} from '../shared/entity/where.enum';
import {DeviceService} from '../shared/service/device.service';
import {newVersion} from './ngrx/actions/application.actions';
import {ApplicationService} from '../shared/service/application.service';
import {TWBase} from '../shared/TWBase.ui';
import {SharedModule} from '../shared/shared.module';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        TranslateModule.forRoot(translateModuleConfig()),
        StoreModule.forRoot({
            downloadApk: _downloadApkReducer,
            user: _userReducer,
            newVersion: _newVersion,
            userLogout: _userLogoutReducer
        }),
        SharedModule
    ],
    exports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptor,
            multi: true
        },
    ],
})
export class CoreModule extends TWBase {
    // 两个注解是防止循环调用和第一次的时候可以调用
    constructor(@Optional() @SkipSelf() parent: CoreModule,
                ir: MatIconRegistry,
                ds: DomSanitizer,
                private translate: TranslateService,
                private platform: Platform,
                private router: Router,
                private userSV: UserService,
                private storageSV: StorageService,
                private store: Store<{ user: 'user', newVersion: 'newVersion', userLogout: 'userLogout' }>,
                private languageSV: LanguageService,
                private routerSV: RouterService,
                private deviceSV: DeviceService,
                private appSV: ApplicationService,
                private splash: SplashScreen
    ) {
        super();
        if(parent) throw new Error('模块已经存在，不能再次加载');
        
        // 注入svg图片
        loadSvgResources(ir, ds);
        
        // 语言设置
        this.languageSV.languageSettings();
        
        // 设置系统需要的语言常量
        this.languageSV.initStaticLanguage();
        
        // 从缓存中获取用户信息
        this.userSV.getUserFromStorage().subscribe(r => {
            // 通过token查询用户信息
            if(r) this.userSV.getUserInfoByToken().subscribe();
            else this.routerSV.to(WHERE.login);
        });
        
        // 用户信息有更新的业务:更新缓存
        this.store.pipe(select('user')).subscribe(_ => {
            this.storageSV.storageUserInfo().subscribe();
        });
        
        // 用户退出登录候的业务
        this.store.pipe(select('userLogout')).subscribe(_ => {
        
        });
        
        // 开启路由检测
        this.routerSV.routeDetection();
        
        // 注册物理返回键
        this.deviceSV.androidBackButtonRegister();
        
        // 检查版本有没有更新,并做强制升级处理
        this.appSV.checkNewVersionOnLoad();
        
        this.platform.ready().then(_ => {
            // this.presentToast('平台准备好了');
        });
    }
}

