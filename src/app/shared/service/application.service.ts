import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {Httpbase} from './httpbase';
import {RETURN} from '../utils/return-verify.util';
import {data, result} from '../entity/result.bo';
import {URL} from '../const/url.const';
import {DeviceService} from './device.service';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {APP} from '../../core/singleton.export';

@Injectable({providedIn: 'root'})
export class ApplicationService extends Httpbase {
    
    constructor(httpClient: HttpClient,
                private storageSV: StorageService,
                private deviceSV: DeviceService,
                public appVersion: AppVersion,
    ) {
        super(httpClient);
    }
    
    
    
    getVersionFeaturesList(page: number): Observable<data> {
        return new Observable<data>(o => {
            let queryObj = {
                current: page,
                size: APP.versonFeaturesPZ
            };
            this.postJson(URL.version_features_list, queryObj).subscribe(r => {
                RETURN.nextData(r, o);
            });
        });
    }
    
    getVersionFeaturesDetail(id: number): Observable<result> {
        return new Observable<result>(o => {
            this.get(URL.get_version_detail + id).subscribe(r => {
                if(RETURN.isSucceed(r)) o.next(r);
                else o.next();
            });
        });
    }
    
    getVersion(): Observable<string> {
        return new Observable<string>(o => {
            if(this.deviceSV.isCordova())
                this.appVersion.getVersionNumber().then(version => {
                    o.next(version);
                });
            else o.next(APP.appVersion);
            
        });
    }
    
    
}
