import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {result, resultObj} from '../entity/result.bo';
import {APP} from '../../core/singleton.export';
import {TWBase} from '../TWBase.ui';

export class Httpbase extends TWBase {
    
    constructor(public httpClient: HttpClient) {
        super();
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
