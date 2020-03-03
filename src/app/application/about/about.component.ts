import {Component, OnInit} from '@angular/core';
import {UpgradeService} from '../upgrade/upgrade.service';
import {File} from '@ionic-native/file/ngx';
import {TWBase} from '../../shared/TWBase.ui';
import {LoadingController, Platform, ToastController} from '@ionic/angular';
import {DeviceService} from '../../shared/service/device.service';
import {FileService} from '../../shared/service/file.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent extends TWBase {
    
    constructor(
        private upgrapdeSV: UpgradeService,
        private file: File,
        private deviceSV: DeviceService,
        private fileSV: FileService,
        private platform: Platform
    ) {
        super();
    }
    
    ngOnInit() {
    }
    
    checkUpdate() {
        // this.upgrapdeSV.checkVersion();
        
        this.fileSV.openFile(null, null);
    }
    
    checkUpdate1() {
        this.upgrapdeSV.checkVersion1();
    }
    
    checkUpdate2() {
        this.upgrapdeSV.checkVersion2();
        this.presentToast(this.file.externalDataDirectory);
    }
    
    
    test1() {
        this.file.checkFile(this.deviceSV.deviceFilePath(), 'android.apk')
        .then(r => this.presentToast(JSON.stringify(r)))
        .catch(err => this.presentToast('Meiyou quanxian ' + err));
    }
    
    test2() {
        // this.fileSV.downloadFile();
    }
}
