import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {result} from '../entity/resultbo';
import {APP} from 'src/environments/app.config';
import {URL} from '../const/url.const';
import {USER} from '../entity/user.bo';

@Injectable({providedIn: 'root'})
export class ApplicationService {
    
    constructor(private httpClient: HttpClient,
                private storageSV: StorageService
    ) {
    }
    
    getVersionFeaturesList() {
        let queryObj = {
            current: '1',
            size: '15'
        };
        return new Observable<any>(o => {
            this.httpClient.post<result>(APP.fullURL(URL.version_features_list), new HttpParams({fromObject: queryObj})).subscribe(r => {
                console.log(USER.get());
                console.log(r);
            });
        });
    }
}
