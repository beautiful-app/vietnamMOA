import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, ThemePalette} from '@angular/material';
import {Store, select} from '@ngrx/store';
import {TWBase} from '../../TWBase.ui';
import {FileService} from '../../service/file.service';
import {DeviceService} from '../../service/device.service';
import {downloadApk} from '../../../core/ngrx/actions/application.actions';


@Component({
    selector: 'app-upgrade',
    templateUrl: './upgrade.component.html',
    styleUrls: ['./upgrade.component.scss'],
})
export class UpgradeComponent extends TWBase {
    canUpgrade = true;
    downloading = false;
    color: ThemePalette = 'primary';
    mode = 'buffer';
    bufferValue = 0;
    rate: number = 0;
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<UpgradeComponent>,
        private fileSV: FileService,
        private store: Store<{ downloadApk: 'downloadApk' }>,
        private deviceSV: DeviceService,
        private cdr: ChangeDetectorRef,
    ) {
        super();
        this.canUpgrade = data.latestVersion;
    }
    
    ngOnInit() {
        this.deviceSV.dialogMode(this.dialogRef);
        this.store.pipe(select('downloadApk')).subscribe(r => {
            let rate = Number(r);
            if(this.downloading && rate <= -1) this.close();
            if(rate > 0) {
                this.rate = rate;
                this.downloading = true;
                if(this.rate + 5 > this.bufferValue) this.bufferValue = this.rate + Math.ceil(Math.random() * 25);
                this.cdr.detectChanges();
            }
        });
    }
    
    close() {
        this.dialogRef.close(_ => {
        });
    }
    
    update() {
        this.downloading = true;
        // let url = 'https://dz-pic-test.oss-cn-shanghai.aliyuncs.com/abc1231231.apk';
        // let url1 = 'https://appdl-drcn.dbankcdn.com/dl/appdl/application/apk/53/53df72eda3f44774b7e26ab5b4d56be1/com.asyey.sport.2002281121.apk';
        let url = this.data.downloadUrl;
        let appPath = 'android.apk';
        this.fileSV.downloadFile(url, appPath);
    }
}
