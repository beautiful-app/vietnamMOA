import {Injectable} from '@angular/core';
import {STORAGE_KEY} from '../const/storageKey.const';
import {USER} from '../entity/user.bo';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs';
import {RETURN} from "../utils/return-verify.util";
import {APP} from "../../core/singleton.export";
import {DeviceService} from "./device.service";
import {AppVersion} from "@ionic-native/app-version/ngx";

@Injectable({providedIn: 'root',})
/**
 * @Description: 本地缓存操作服务类
 */
export class StorageService {
	
	constructor(private storage: Storage,
	            private deviceSV: DeviceService,
	            private appVersion: AppVersion
	) {
	}
	
	/**
	 * @Description: 缓存用户信息
	 * @return Observeble<any>
	 */
	storageUserInfo(): Observable<any> {
		return new Observable<any>(o => {
			this.storage.set(STORAGE_KEY.user_obj, USER.get()).then(() => {
				o.next();
			});
		});
	}
	
	/**
	 * @Description: 从缓存中获取用户信息
	 * @return:  Observeble<any>
	 */
	getUser(): Observable<any> {
		return new Observable<any>(o => {
			this.storage.get(STORAGE_KEY.user_obj).then(r => {
				if (r) o.next(r);
				else o.next(false);
			});
		});
	}
	
	/**
	 * @Description: 从缓存中获取用户是否在某特定版本有过上报记录
	 * @return:  Observeble<any>
	 */
	getUserMarkWidthVersion(): Observable<any> {
		return new Observable<any>(o => {
			this.getVersion().subscribe(versionR => {
				this.storage.get(STORAGE_KEY.user_version_match).then(markR => {
					let reportMark = String(USER.get().id + versionR);
					console.log("缓存中用户对应版本的记录信息:", markR, reportMark);
					RETURN.nextTrueOrFalse(o, markR == reportMark);
				});
			});
		});
	}
	
	/**
	 * @Description: 设置用户对应版本的上报记录标识
	 */
	setUserMarkWidthVersion(): Observable<boolean> {
		return new Observable<any>(o => {
			this.getVersion().subscribe(versionR => {
				let reportMark = String(USER.get().id + versionR);
				console.log("上传版本号:", reportMark);
				this.storage.set(STORAGE_KEY.user_version_match, reportMark).then(r => {
					o.next(true);
					o.complete();
				});
			});
			
		});
	}
	
	
	/**
	 * @Description: 清空用户缓存信息
	 */
	clearUserInfo() {
		this.storage.remove(STORAGE_KEY.user_obj);
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
}
