import {Component, OnInit} from '@angular/core';
import {File} from '@ionic-native/file/ngx';
import {TWBase} from '../../shared/TWBase.ui';
import {LoadingController, Platform, ToastController} from '@ionic/angular';
import {DeviceService} from '../../shared/service/device.service';
import {FileService} from '../../shared/service/file.service';
import {ApplicationService} from '../../shared/service/application.service';
import {MatDialog} from '@angular/material';
import {Lang} from '../../shared/const/language.const';
import {select, Store} from '@ngrx/store';
import {UpgradeComponent} from '../../shared/component/tw-upgrade/upgrade.component';

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
        private store: Store<{ user: 'user', newVersion: 'newVersion' }>,
    ) {
        super();
        this.appSV.getVersion().subscribe(r => {
            this.version = r;
        });
        
        this.store.pipe(select('newVersion')).subscribe(r => {
            this.newMark = Boolean(r);
        });
    }
    
    ngOnInit() {
    }
    
    checkUpdate() {
        if(!this.onChekVerion) {
            this.onChekVerion = true;
            setTimeout(_ => {
                this.appSV.checkNewVersion().subscribe(r => {
                    // 有新版本 打开升级对话框
                    if(r) {
                        this.openDialog(this.dialog, UpgradeComponent, r);
                    } else this.presentToast(Lang.Lang_76);
                    this.onChekVerion = false;
                });
            }, 2500);
        }
    }
    
}
