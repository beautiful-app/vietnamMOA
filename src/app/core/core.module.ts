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
import {newVersion} from './ngrx/actions/application.actions';
import {ApplicationService} from '../shared/service/application.service';
import {TWBase} from '../shared/TWBase.ui';
import {SharedModule} from '../shared/shared.module';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {USER} from "../shared/entity/user.bo";


@NgModule({
	declarations: [],
	imports: [
		SharedModule,
		// HttpClientModule,
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
	            private splash: SplashScreen,
	            private keyboard: Keyboard,
	) {
		super();
		if (parent) throw new Error('核心模块仅实例化一次');
		
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
		this.store.pipe(select('user')).subscribe(_ => {
			// 缓存用户信息
			this.storageSV.storageUserInfo().subscribe();
			
			// 上报客户端信息，有新的更新信息都要上报
			if (USER.get().token) this.appSV.reportClientInfo();
			// this.appSV.reportClientInfo();
		});
		
		// 开启路由检测
		this.routerSV.routeDetection();
		
		// 注册物理返回键
		this.deviceSV.androidBackButtonRegister();
		
		// 检查版本有没有更新,并做强制升级处理
		this.appSV.checkNewVersionOnLoad();
		
		
		// 本地设备平台可用后执行的操作
		this.platform.ready().then(_ => {
			
			// 显示软键盘的工具栏，让用户可以进行按钮关闭等操作
			this.keyboard.hideFormAccessoryBar(false);
			
			
		});
	}
}

