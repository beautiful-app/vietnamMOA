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
    }
    
    postJson(url: string, queryObj: any): Observable<result> {
        let httpOptions = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
        return this.httpClient.post<result>(APP.fullURL(url), queryObj, httpOptions);
    }
    
    get(url: string): Observable<result> {
        return this.httpClient.get<resultObj>(APP.fullURL(url));
    }
    
}
