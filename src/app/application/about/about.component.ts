import {Component} from '@angular/core';
import {File} from '@ionic-native/file/ngx';
import {TWBase} from '../../shared/TWBase.ui';
import {Platform} from '@ionic/angular';
import {DeviceService} from '../../shared/service/device.service';
import {FileService} from '../../shared/service/file.service';
import {ApplicationService} from '../../shared/service/application.service';
import {MatDialog} from '@angular/material';
import {Lang} from '../../shared/const/language.const';
import {select, Store} from '@ngrx/store';
import {UpgradeComponent} from '../../shared/component/tw-upgrade/upgrade.component';
import {delay} from 'rxjs/operators';
import {StoreTypeEnum} from "../../core/ngrx/store-type.enum";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent extends TWBase {
    version: string;
    onChekVerion: boolean = false;
    newMark: boolean = false;
    
    constructor(
        private file: File,
        private deviceSV: DeviceService,
        private fileSV: FileService,
        private platform: Platform,
        private appSV: ApplicationService,
        private dialog: MatDialog,
        private store: Store<StoreType>,
    ) {
        super();
        this.appSV.getVersion().subscribe(r => {
            this.version = r;
        });
        this.store.pipe(select(StoreTypeEnum.newVersion)).subscribe(r => {
            this.newMark = Boolean(r);
        });
    }
    
    ngOnInit() {
    }
    
    /**
     * 检测更新
     */
    checkUpdate() {
        if (!this.onChekVerion) {
            this.onChekVerion = true;
            this.appSV.checkNewVersion().pipe(delay(2500)).subscribe(
                r => {
                    // 有新版本 打开升级对话框
                    if (r) {
                        this.openDialog(this.dialog, this.deviceSV, UpgradeComponent, r).subscribe();
                    } else this.presentToast(Lang.Lang_76);
                }, null,
                () => this.onChekVerion = false
            );
        }
    }
}
