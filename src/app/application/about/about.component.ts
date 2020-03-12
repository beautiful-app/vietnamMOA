import {Component, OnInit} from '@angular/core';
import {UpgradeService} from '../upgrade/upgrade.service';
import {File} from '@ionic-native/file/ngx';
import {TWBase} from '../../shared/TWBase.ui';
import {LoadingController, Platform, ToastController} from '@ionic/angular';
import {DeviceService} from '../../shared/service/device.service';
import {FileService} from '../../shared/service/file.service';
import {ApplicationService} from '../../shared/service/application.service';
import {MatDialog} from '@angular/material';
import {UpgradeComponent} from '../upgrade/upgrade.component';
import {Lang} from '../../shared/const/language.const';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent extends TWBase {
    version: string;
    onChekVerion: boolean = false;
    
    constructor(
        private upgrapdeSV: UpgradeService,
        private file: File,
        private deviceSV: DeviceService,
        private fileSV: FileService,
        private platform: Platform,
        private appSV: ApplicationService,
        private dialog: MatDialog
    ) {
        super();
        this.appSV.getVersion().subscribe(r => {
            this.version = r;
        });
    }
    
    ngOnInit() {
    }
    
    checkUpdate() {
        if(!this.onChekVerion) {
            this.onChekVerion = true;
            this.appSV.checkNewVersion().subscribe(r => {
                // 有新版本 打开升级对话框
                if(r) {
                    console.log('有新版本:', r);
                    this.openDialog(this.dialog, UpgradeComponent, r);
                } else this.presentToast(Lang.Lang_76);
                this.onChekVerion = false;
            });
        }
    }
    
}
