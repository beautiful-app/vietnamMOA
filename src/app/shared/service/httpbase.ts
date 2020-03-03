import {APP} from '../../../environments/app.config';
import {URL} from '../const/url.const';
import {HttpClient, HttpHandler, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RETURN} from '../utils/return-verify.util';
import {USER} from '../entity/user.bo';
import {result, resultObj} from '../entity/result.bo';

export class Httpbase {
    
    constructor(public httpClient: HttpClient) {
    }
    
    post(url: string, queryObj?: any): Observable<result> {
        // return this.httpClient.post<result>(APP.fullURL(URL.login_check), {fromObject: queryObj});
        return this.httpClient.post<result>(APP.fullURL(url), new HttpParams({fromObject: queryObj}));
        //    return this.httpClient.post<result>(APP.fullURL(URL.version_features_list), new HttpParams({fromObject: queryObj})).subscribe(r => {
        //     console.log(USER.get());
        //     console.log(r);
        // });
        
        // req = req.clone({headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')});
        // this.httpClient.post<resultObj>(APP.fullURL(URL.login_check), new HttpParams({fromObject: loginInfo})).subscribe(r => {
        //     if(RETURN.isSucceed(r)) {
        //         // 进行用户token信息保存
        //         r.data.id = loginInfo.username;
        //         USER.assign(r.data, this.storeSV);
        //         // 根据token获取用户信息
        //         this.getUserInfoByToken().subscribe(r => {
        //             if(r) o.next(true);
        //             else o.next(r);
        //         });
        //     } else o.next(r);
        // });
        
    }
    
    postJson(url: string, queryObj: any): Observable<result> {
        let httpOptions = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
        return this.httpClient.post<result>(APP.fullURL(url), queryObj, httpOptions);
    }
    
    get(url: string): Observable<resultObj> {
        return this.httpClient.get<resultObj>(APP.fullURL(url));
        // this.httpClient.get<resultObj>(APP.fullURL(URL.get_user_info) + USER.get().id).subscribe(r => {
        //     if(RETURN.isSucceed(r)) {
        //         USER.assign(r.data, this.storeSV);
        //         // 保存用户信息到缓存
        //         this.storageSV.storageUserInfo().subscribe(r => {
        //             o.next(true);
        //         });
        //     } else {
        //         o.next(r);
        //     }
        // });
    }
    
}
