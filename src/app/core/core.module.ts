import {NgModule, Optional, SkipSelf} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {loadSvgResources} from './svg.util';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
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
import {DeviceService} from '../shared/service/device.service';
import {ApplicationService} from '../shared/service/application.service';
import {TWBase} from '../shared/TWBase.ui';
import {SharedModule} from '../shared/shared.module';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {USER} from "../shared/entity/user.bo";
import {StoreTypeEnum} from "./ngrx/store-type.enum";


@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        TranslateModule.forRoot(translateModuleConfig()),
        StoreModule.forRoot({
            downloadApk: _downloadApkReducer,
            user: _userReducer,
            newVersion: _newVersion,
            userLogout: _userLogoutReducer
        }),
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
    // 两个注解是防止循环调用和第一次加载的时候可以调用
    constructor(@Optional() @SkipSelf() parent: CoreModule,
                ir: MatIconRegistry,
                ds: DomSanitizer,
                private translate: TranslateService,
                private platform: Platform,
                private router: Router,
                private userSV: UserService,
                private storageSV: StorageService,
                private store: Store<StoreType>,
                private languageSV: LanguageService,
                private routerSV: RouterService,
                private deviceSV: DeviceService,
                private appSV: ApplicationService,
                private splash: SplashScreen,
                private keyboard: Keyboard,
    ) {
        super();
        console.log("%c T&W 越南工资条 ", "background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:5em");
        console.log('%c >>核心模块已加载<<', 'background: #FF5151;color: #4DFFFF;font-size:1rem;', '并且只加载一次（这句话只能看到一次）');
        
        
        // 注入svg图片
        loadSvgResources(ir, ds);
    
        // 语言设置
        this.languageSV.languageSettings();
        
        // 初始化系统需要的语言常量
        this.languageSV.initStaticLanguage();
        
        // 从缓存中获取用户信息
        this.userSV.getUserFromStorage().subscribe(r => {
            // 通过token查询用户信息
            if (r) this.userSV.getUserInfoByToken().subscribe();
            else this.routerSV.toLogin();
        });
        
        // 用户信息有更新的业务:更新缓存
        this.store.pipe(select(StoreTypeEnum.user)).subscribe(_ => {
            // 缓存用户信息
            this.storageSV.storageUserInfo().subscribe();
            // 上报客户端信息，有新的更新信息都要上报
            // if (USER.get().token) this.appSV.reportClientInfo();
        });
        
        // 开启路由检测
        this.routerSV.routeDetection();
        
        // 注册物理返回键
        this.deviceSV.androidBackButtonRegister();
        
        // 检查版本有没有更新,并做升级处理
        this.appSV.checkNewVersionOnLoad();
        
        // 本地设备平台可用后执行的操作
        this.platform.ready().then(_ => {
            // 显示软键盘的工具栏，让用户可以进行按钮关闭等操作
            this.keyboard.hideFormAccessoryBar(false);
        });
    }
}

