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
import {Device} from '@ionic-native/device/ngx';
import {newVersion} from '../../core/ngrx/actions/application.actions';
import {MatDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import {UpgradeComponent} from '../component/tw-upgrade/upgrade.component';
import {delay} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ApplicationService extends Httpbase {
    
    constructor(httpClient: HttpClient,
                private storageSV: StorageService,
                private deviceSV: DeviceService,
                public appVersion: AppVersion,
                private device: Device,
                private dialog: MatDialog,
                private store: Store<{ user: 'user', newVersion: 'newVersion' }>,
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
                RETURN.nextData(o, r);
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
    
    
    checkNewVersion(): Observable<data> {
        return new Observable<data>(o => {
            this.getVersion().subscribe(r => {
                let params = {
                    deviceId: this.device.uuid,
                    deviceType: this.deviceSV.isIos() ? APP.downloadIos : APP.downloadAndroid,
                    version: r
                };
                this.postJson(URL.version_check, params).subscribe(rr => {
                    RETURN.nextData(o, rr);
                });
            });
        });
    }
    
    checkNewVersionOnLoad() {
        let _this = this;
        window.addEventListener('load', function() {
            _this.checkNewVersion().pipe(delay(2000)).subscribe(r => {
                if(r) {
                    _this.openDialog(_this.dialog, _this.deviceSV, UpgradeComponent, r).subscribe();
                    _this.store.dispatch(newVersion({newVersion: true}));
                }
            });
        }, false);
    }
}
