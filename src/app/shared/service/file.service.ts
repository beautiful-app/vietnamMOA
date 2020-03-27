import {Injectable} from '@angular/core';
import {File} from '@ionic-native/file/ngx';
import {DeviceService} from './device.service';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {TWBase} from '../TWBase.ui';
import {Store} from '@ngrx/store';
import {downloadApk} from '../../core/ngrx/actions/application.actions';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class FileService extends TWBase {
    
    constructor(private file: File,
                private deviceSV: DeviceService,
                private ft: FileTransfer,
                private fo: FileOpener,
                private store: Store<{ downloadApk: 'downloadApk' }>
    ) {
        super();
    }
    
    
    downloadFile1(): Observable<{ rate: number }> {
        console.log('进来了');
        return new Observable<any>(o => {
            let a = 1;
            let inter = setInterval(_ => {
                a += 1;
                this.store.dispatch(downloadApk({rate: a}));
                if(a >= 100) {
                    clearInterval(inter);
                    this.store.dispatch((downloadApk({rate: -1})));
                }
            }, 100);
        });
    }
    
    /**
     * @name 下载文件方法
     * @param url
     * @param relativePath
     */
    downloadFile(url: string, relativePath: string) {
        if(this.deviceSV.isIos()) {
            this.deviceSV.openUrlInNaviteBrowser(url);
            this.store.dispatch(downloadApk({rate: -1}));
            return;
        }
        
        const fileTransfer = this.ft.create();
        fileTransfer.download(encodeURI(url), this.deviceSV.deviceFilePath() + relativePath).then((entry) => {
                // this.presentToast('download has completed:' + JSON.stringify(entry), 1000000);
            }, (error) => {
                this.store.dispatch(downloadApk({rate: -1}));
            }
        );
        
        let timer = null;
        fileTransfer.onProgress((event: ProgressEvent) => {
            let progress = Math.floor(event.loaded / event.total * 100);    //下载进度
            if(progress >= 100) {
                setTimeout(_ => {
                    this.openFile(null, null);
                    this.store.dispatch(downloadApk({rate: -1}));
                }, 2000);
            }
            if(!timer || progress >= 100) {
                timer = setTimeout(() => {
                    this.store.dispatch(downloadApk({rate: progress}));
                    timer = null;
                }, 1200);
            }
        });
    }
    
    /**
     * @name 打开文件的方法
     * @param targetPath
     * @param fileMimeType
     */
    openFile(targetPath: string, fileMimeType: string) {
        let url = this.deviceSV.deviceFilePath() + 'android.apk';
        let mime = 'application/vnd.android.package-archive';
        // this.fo.open(targetPath, mime)
        this.fo.open(url, mime)
        .then(r => {
                this.presentToast('open file success:' + JSON.stringify(r));
            }
        )
        .catch(
            r => {
                this.presentToast('打开文件出错:' + JSON.stringify(r));
            }
        );
    }
    
    writeFile() {
    }
}
