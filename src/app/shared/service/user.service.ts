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
import {MapperUtil} from '../utils/mapper.util';
import {MatchFieldBo} from '../entity/match-field.bo';
import {result, resultObj} from '../entity/result.bo';

@Injectable({
    providedIn: 'root'
})
export class UserService extends Httpbase {
    
    constructor(public httpClient: HttpClient,
                private storageSV: StorageService,
                private storeSV: Store<{ user: 'user' }>
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
                    USER.assign(r.data, this.storeSV);
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
                console.log(r);
                if(RETURN.isSucceed(r)) {
                    USER.assign(r.data, this.storeSV);
                    o.next(true);
                }
            });
        });
    }
    
    getUserFromStorage(): Observable<CheckBo> {
        return new Observable<any>(o => {
            this.storageSV.getUser().subscribe(r => {
                // return true;
                USER.assign(r, this.storeSV, true);
                if(r) {
                    o.next(true);
                    return true;
                } else o.next(false);
            });
            o.next('dkfjk');
        });
    }
    
    changePassword(queryObj: any = {}): Observable<boolean | result> {
        let changesObj = MapperUtil.mapPart(queryObj,
            MatchFieldBo.toMatchFieldArray([['oldPassword', 'oldPwd'], ['confirmPassword', 'newPwd']]));
        return new Observable<boolean | result>(o => {
            this.postJson(URL.change_password, changesObj).subscribe(r => {
                if(RETURN.isSucceed(r)) o.next(true);
                else o.next(r);
            });
        });
    }
}
