import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {Httpbase} from './httpbase';
import {RETURN} from '../utils/return-verify.util';
import {data, result} from '../entity/result.bo';
import {URL} from '../const/url.const';
import {DeviceService} from './device.service';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {APP} from '../../core/singleton.export';
import {Device} from '@ionic-native/device/ngx';
import {newVersion} from '../../core/ngrx/actions/application.actions';
import {MatDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import {UpgradeComponent} from '../component/tw-upgrade/upgrade.component';
import {delay} from 'rxjs/operators';
import {USER} from "../entity/user.bo";

@Injectable({providedIn: 'root'})
/**
 * @Description: 应用基本服务类
 */
export class ApplicationService extends Httpbase {
	
	constructor(httpClient: HttpClient,
	            private storageSV: StorageService,
	            private deviceSV: DeviceService,
	            public appVersion: AppVersion,
	            private device: Device,
	            private dialog: MatDialog,
	            private store: Store<{ user: 'user', newVersion: 'newVersion' }>,
	) {
		super(httpClient);
	}
	
	/**
	 * @Description: 获取更新说明列表信息
	 * @param: {page}页数
	 * @return:  Observable<data>
	 */
	getVersionFeaturesList(page: number): Observable<data> {
		return new Observable<data>(o => {
			let queryObj = {
				current: page,
				size: APP.versonFeaturesPZ
			};
			this.postJson(URL.version_features_list, queryObj).subscribe(r => {
				RETURN.nextData(o, r);
			});
		});
	}
	
	/**
	 * @Description: 获取更新说明详情
	 * @param:  {id} 版本更新说明文章id
	 * @return:  Observable<result>
	 */
	getVersionFeaturesDetail(id: number): Observable<result> {
		return new Observable<result>(o => {
			this.get(URL.get_version_detail + id).subscribe(r => {
				if (RETURN.isSucceed(r)) o.next(r);
				else o.next();
			});
		});
	}
	
	/**
	 * @Description: 获取当前版本号
	 */
	getVersion(): Observable<string> {
		return new Observable<string>(o => {
			if (this.deviceSV.isCordova())
				this.appVersion.getVersionNumber().then(version => {
					o.next(version);
				});
			else o.next(APP.appVersion);
		});
	}
	
	
	/**
	 * @Description: 检查是否有新版本
	 * @return Observable<data>
	 */
	checkNewVersion(): Observable<data> {
		return new Observable<data>(o => {
			this.getVersion().subscribe(r => {
				let params = {
					deviceId: this.device.uuid ? this.device.uuid : 'k5kaskf115a4d66f4',
					deviceType: this.deviceSV.isIos() ? APP.downloadIos : APP.downloadAndroid,
					// deviceType: APP.downloadIos,
					version: r,
					country: 'VN'
				};
				this.postJson(URL.version_check, params).subscribe(rr => {
					RETURN.nextData(o, rr);
				});
			});
		});
	}
	
	/**
	 * @Description: 当程序加载可见后再进行更新检查，用户应用开始加载时用
	 */
	checkNewVersionOnLoad() {
		let _this = this;
		window.addEventListener('load', function () {
			_this.checkNewVersion().pipe(delay(2000)).subscribe(r => {
				if (r) {
					_this.openDialog(_this.dialog, _this.deviceSV, UpgradeComponent, r).subscribe();
					_this.store.dispatch(newVersion({newVersion: true}));
				}
			});
		}, false);
	}
	
	/**
	 * 上报客户信息
	 * 上报时机：某用户在某个真机下的某版本下登录，就上报一次
	 */
	reportClientInfo() {
		// 检查该用户在当前版本是否已经上报过
		this.storageSV.getUserMarkWidthVersion().subscribe(r => {
			console.log("return 前");
			// 如果用户在该版本下已经上报过信息
			if (r) return;
			console.log("进行上报");
			let widths = Math.floor(window.screen.width * window.devicePixelRatio);
			let heights = Math.floor(window.screen.height * window.devicePixelRatio);
			this.getVersion().subscribe(versionR => {
				let queryObj = {
					appVersion: versionR, // APP当前版本号
					deviceId: this.device.uuid ? this.device.uuid : versionR, // 手机IMEI值
					osVersion: this.device.version ? this.device.version : 'window10', // 客户端操作系统版本如：10.3.2(14F89)
					deviceType: this.device.model ? this.device.model : "PC", // 客户端设备类型如：Samsung、HuaWei、Iphone
					screen: widths + "*" + heights, // 屏幕分辨率大小如：1024*768
					firstOpen: true,  // 当前用户是否首次打开App
					country: "VN"  // 国家代码
				};
				
				this.postJson(URL.report_client_info, queryObj).subscribe(r => {
					// 上报成功后缓存当前版本和对应的用户
					this.storageSV.setUserMarkWidthVersion().subscribe();
				});
			});
		});
	}
}
