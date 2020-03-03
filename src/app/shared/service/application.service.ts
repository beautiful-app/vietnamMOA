import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {APP} from 'src/environments/app.config';
import {Httpbase} from './httpbase';
import {RETURN} from '../utils/return-verify.util';
import {data} from '../entity/result.bo';
import {URL} from '../const/url.const';

@Injectable({providedIn: 'root'})
export class ApplicationService extends Httpbase {
    
    constructor(httpClient: HttpClient,
                private storageSV: StorageService
    ) {
        super(httpClient);
    }
    
    getVersionFeaturesList(): Observable<data> {
        let queryObj = {
            current: '1',
            size: APP.versonFeaturesPZ
        };
        return new Observable<data>(o => {
            this.postJson(URL.version_features_list, queryObj).subscribe(r => {
                if(RETURN.isSucceed(r)) o.next(r.data);
            });
        });
    }
}
