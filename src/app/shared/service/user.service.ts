import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URL} from '../const/url.const';
import {RETURN} from '../utils/return-verify.util';
import {USER} from '../entity/user.bo';
import {APP} from '../../../environments/app.config';
import {result} from '../entity/resultbo';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    constructor(private httpClient: HttpClient,
                private storageSV: StorageService
    ) {
    }
    
    doLogin(loginInfo: any): Observable<boolean | Object> {
        return new Observable<any>(o => {
            // let queryObj = {
            //     username: '15604',
            //     password: '393228cff4dec4c4122f1373acfc1018',
            //     source: 'mobile'
            // };
            // delete loginInfo.remember;
            loginInfo.source = 'mobile';
            
            console.log(loginInfo);
            this.httpClient.post<result>(APP.fullURL(URL.login_check), new HttpParams({fromObject: loginInfo})).subscribe(r => {
                if(RETURN.isSucceed(r)) {
                    // 进行用户token信息保存
                    r.data.id = loginInfo.username;
                    USER.assign(r.data);
                    // 根据token获取用户信息
                    this.getUserInfoByToken().subscribe(r => {
                        if(r) o.next(true);
                        else o.next(r);
                    });
                } else o.next(r);
            });
        });
    }
    
    getUserInfoByToken(): Observable<any> {
        return new Observable<any>(o => {
            this.httpClient.get<result>(APP.fullURL(URL.get_user_info) + USER.get().id).subscribe(r => {
                if(RETURN.isSucceed(r)) {
                    USER.assign(r.data);
                    // 保存用户信息到缓存
                    this.storageSV.storageUserInfo().subscribe(r => {
                        o.next(true);
                    });
                } else {
                    o.next(r);
                }
            });
        });
    }
    
    getUserFromStorage(): Observable<any> {
        return new Observable<any>(o => {
            // this.storageSV.getUser().subscribe(r => {
            //     return true;
            //     USER.assign(r, true);
            //     if(r) {
            //         o.next(true);
            //         return true;
            //     } else o.next(false);
            // });
            o.next('dkfjk');
        });
    }
}
