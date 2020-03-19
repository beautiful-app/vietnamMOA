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
import {WHERE} from '../entity/where.enum';
import {userLogOut} from '../../core/ngrx/actions/user.actions';

@Injectable({
    providedIn: 'root'
})
export class UserService extends Httpbase {
    
    constructor(public httpClient: HttpClient,
                private storageSV: StorageService,
                private store: Store<{ user: 'user', userLogout: 'userLogout' }>,
                private routerSV: RouterService
    ) {
        super(httpClient);
    }
    
    doLogin(loginInfo: any = {}): Observable<CheckBo> {
        return new Observable<any>(o => {
            loginInfo.source = 'mobile';
            this.post(URL.login_check, loginInfo).subscribe(r => {
                if(RETURN.isSucceed(r)) {
                    // 进行用户token信息保存
                    r.data.id = loginInfo.username;
                    USER.assign(r.data, this.store);
                    // 根据token获取用户信息
                    this.getUserInfoByToken().subscribe(r => {
                        if(r) o.next(true);
                        else o.next(r);
                    });
                } else o.next(r);
            });
        });
    }
    
    getUserInfoByToken(): Observable<CheckBo> {
        return new Observable<any>(o => {
            this.get(URL.get_user_info + USER.get().id).subscribe(r => {
                if(RETURN.isSucceed(r)) {
                    console.log('查询到用户信息啦AAAAAAAAAAAAAA', r);
                    USER.assign(r.data, this.store, null, true);
                    o.next(true);
                } else o.next(false);
            });
        });
    }
    
    getUserFromStorage(): Observable<CheckBo> {
        return new Observable<any>(o => {
            this.storageSV.getUser().subscribe(r => {
                if(r && r._token) {
                    USER.assign(r, this.store, true);
                    o.next(true);
                } else o.next(false);
            });
        });
    }
    
    changePassword(queryObj: any = {}): Observable<result> {
        let changesObj = EntityUtil.fieldReplacement(queryObj, [['oldPassword', 'oldPwd'], ['confirmPassword', 'newPwd']]);
        return new Observable<result>(o => {
            this.postJson(URL.change_password, changesObj).subscribe(r => {
                if(RETURN.isSucceed(r)) o.next();
                else o.next(r);
            });
        });
    }
    
    setPhoneNumber(phoneNum: string): Observable<boolean | result> {
        return new Observable<boolean | result>(o => {
            let param = {
                type: '2',
                value: phoneNum
            };
            this.postJson(URL.change_phone_number, param).subscribe(r => {
                RETURN.next(r, o);
            });
        });
    }
    
    confirmPhoneForResetPassword(account: string): Observable<result | boolean | any> {
        return new Observable<result | boolean>(o => {
            this.get(URL.get_confirm_phone_for_reset_password + account).subscribe(r => {
                if(r.data && r.data.cellphone) {
                    o.next(r.data);
                } else o.next(false);
            });
            
        });
        
    }
    
    getCodeForRestPassword(account: string): Observable<boolean | result | any> {
        return new Observable<boolean | result>(o => {
            this.get(URL.get_code_for_reset_password + account).subscribe(r => {
                if(RETURN.isSucceed(r)) o.next(r.data);
                else o.next(false);
            });
        });
    }
    
    resetPassword(data: any): Observable<result> {
        let queryObj = EntityUtil.fieldReplacement(data, [['account', 'userId'], ['authCode', 'code']]);
        return new Observable(o => {
            this.postJson(URL.reset_password, queryObj).subscribe(r => {
                o.next(r);
                console.log('password reset result:', r);
            });
        });
    }
    
    loginOut() {
        USER.reset(this.store);
        this.storageSV.clearUserInfo();
        this.routerSV.to(WHERE.login);
    }
    
    clearData() {
    }
}
