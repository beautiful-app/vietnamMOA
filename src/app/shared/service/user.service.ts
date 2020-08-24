import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL} from '../const/url.const';
import {RETURN} from '../utils/return-verify.util';
import {USER} from '../entity/user.bo';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Httpbase} from './httpbase';
import {CheckBo} from '../entity/check.bo';
import {result} from '../entity/result.bo';
import {EntityUtil} from '../utils/entity.util';
import {RouterService} from './router.service';
import {ROUTE} from '../const/route.enum';

@Injectable({
	providedIn: 'root'
})
/**
 * @Description: 用户操作服务类
 */
export class UserService extends Httpbase {
	
	constructor(public httpClient: HttpClient,
	            private storageSV: StorageService,
	            private store: Store<{ user: 'user', userLogout: 'userLogout' }>,
	            private routerSV: RouterService
	) {
		super(httpClient);
	}
	
	/**
	 * @Description: 用户登录操作
	 * @param:  {loginInfo} 用户名、密码等信息对象
	 * @return:  Observable<CheckBo>
	 */
	doLogin(loginInfo: any = {}): Observable<CheckBo> {
		return new Observable<any>(o => {
			loginInfo.source = 'mobile';
			this.post(URL.login_check, loginInfo).subscribe(r => {
				if (RETURN.isSucceed(r)) {
					// 进行用户token信息保存
					r.data.id = loginInfo.username;
					USER.assign(r.data, this.store);
					// 根据token获取用户信息
					this.getUserInfoByToken().subscribe(r => {
						if (r) o.next(true);
						else o.next(r);
					});
				} else o.next(r);
			});
		});
	}
	
	/**
	 * @Description: 通过token获取用户信息
	 * @return:  Observable<CheckBo>
	 */
	getUserInfoByToken(): Observable<CheckBo> {
		return new Observable<any>(o => {
			this.get(URL.get_user_info + USER.get().id).subscribe(r => {
				if (RETURN.isSucceed(r)) {
					console.log("在这里请求token:", r);
					USER.assign(r.data, this.store, null, true);
					o.next(true);
				} else o.next(false);
			});
		});
	}
	
	/**
	 * @Description: 从缓存中获取用户信息
	 */
	getUserFromStorage(): Observable<CheckBo> {
		return new Observable<any>(o => {
			this.storageSV.getUser().subscribe(r => {
				if (r && r._token) {
					USER.assign(r, this.store, true);
					o.next(true);
				} else o.next(false);
			});
		});
	}
	
	/**
	 * @Description: 用户修改密码
	 */
	changePassword(queryObj: any = {}): Observable<result> {
		let changesObj = EntityUtil.fieldReplacement(queryObj, [['oldPassword', 'oldPwd'], ['confirmPassword', 'newPwd']]);
		return new Observable<result>(o => {
			this.postJson(URL.change_password, changesObj).subscribe(r => {
				RETURN.nextCodeAndMsg(o, r);
			});
		});
	}
	
	/**
	 * @Description: 用户修改手机号码
	 */
	setPhoneNumber(phoneNum: string): Observable<boolean | result> {
		return new Observable<boolean | result>(o => {
			let param = {
				type: '2',
				value: phoneNum
			};
			this.postJson(URL.change_phone_number, param).subscribe(r => {
				// 手机号修改接口返回的数据不统一，这里做特殊处理
				let data = JSON.parse(r.data);
				if (data && RETURN.isSucceed(data)) o.next();
				else o.next(data.msg);
				o.complete();
			});
		});
	}
	
	/**
	 * @Description: 找回密码时候确认手机号是否可用
	 * @param:  {account} 手机号
	 * @return:  Observable<result | boolean>
	 */
	confirmPhoneForResetPassword(account: string): Observable<result | boolean | any> {
		return new Observable<result | boolean>(o => {
			this.get(URL.get_confirm_phone_for_reset_password + account).subscribe(r => {
				RETURN.nextData(o, r);
			});
		});
	}
	
	/**
	 * @Description: 获取手机验证码
	 * @param: {accout} 手机号
	 * @return:  Observable<boolean | result>
	 */
	getCodeForRestPassword(account: string): Observable<boolean | result | any> {
		return new Observable<boolean | result>(o => {
			this.get(URL.get_code_for_reset_password + account).subscribe(r => {
				RETURN.nextMsg(o, r);
			});
		});
	}
	
	/**
	 * @Description: 用户重置密码
	 * @param:  {data} 账号、新旧密码等信息对象
	 * @return:  Observable<result>
	 */
	resetPassword(data: any): Observable<result> {
		let queryObj = EntityUtil.fieldReplacement(data, [['account', 'userId'], ['authCode', 'code']]);
		return new Observable(o => {
			this.postJson(URL.reset_password, queryObj).subscribe(r => {
				o.next(r);
			});
		});
	}
	
	/**
	 * @Description: 用户退出
	 */
	loginOut() {
		USER.reset(this.store);
		this.storageSV.clearUserInfo();
		this.routerSV.to(ROUTE.login);
	}
}
