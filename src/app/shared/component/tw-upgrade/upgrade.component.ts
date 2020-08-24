import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, ThemePalette} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {TWBase} from '../../TWBase.ui';
import {FileService} from '../../service/file.service';
import {DeviceService} from '../../service/device.service';
import {downloadApk} from '../../../core/ngrx/actions/application.actions';


@Component({
    selector: 'app-upgrade',
    templateUrl: './upgrade.component.html',
    styleUrls: ['./upgrade.component.scss'],
})
/**
 * @Description: 升级进度条提示组件
 */
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
        // 订阅下载进度
        this.store.pipe(select('downloadApk')).subscribe(r => {
            let rate = Number(r);
            if (this.downloading && rate < 0) this.close(); // 下载完成
            if (rate >= 0) {    // 下载中
                this.rate = rate;
                this.downloading = true;
                if (this.rate + 5 > this.bufferValue) this.bufferValue = this.rate + Math.ceil(Math.random() * 25);
                this.cdr.detectChanges();
            }
        });
    }
    
    /**
     * @Description: 取消升级
     */
    close() {
        this.dialogRef.close(_ => {
        });
    }
    
    /**
     * @Description: 点击升级按钮后执行的方法
     */
    update() {
        this.downloading = true;
        if (this.deviceSV.isIos()) {
            this.deviceSV.openUrlInNaviteBrowser(this.data.downloadUrl);
            this.store.dispatch(downloadApk({rate: -new Date()}));
        } else this.fileSV.downloadFile(this.data.downloadUrl, 'android.apk');
    }
}
