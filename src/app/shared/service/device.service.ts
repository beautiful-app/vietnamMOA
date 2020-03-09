import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {File} from '@ionic-native/file/ngx';
import {TWBase} from '../TWBase.ui';

@Injectable({
    providedIn: 'root'
})
export class DeviceService extends TWBase {
    
    constructor(private platform: Platform,
                private file: File
    ) {
        super();
        
    }
    
    
    // 物理返回键监听
    backButtonRegister() {
        this.platform.ready().then(_ => {
            this.platform.backButton.subscribeWithPriority(99999, () => {
                this.presentToast('priority 1', null, 'bottom');
            });
        });
    }
    
    /**
     * @Description: 返回本软件在设备中的存储路径
     */
    deviceFilePath(): string {
        let path = '';
        if(this.isAndroid()) {
            path = this.file.externalDataDirectory;
        } else if(this.isIos()) {
            path = this.file.syncedDataDirectory;
        }
        return path;
    }
    
    /**
     * 是否android真机环境
     */
    isAndroid(): boolean {
        return this.isCordova() && this.platform.is('android');
    }
    
    /**
     * @name 是否真机环境
     */
    isCordova(): boolean {
        // return this.platform.is('cordova') && !this.platform.is('mobileweb');
        return this.platform.is('cordova');
    }
    
    
    /**
     *@name  是否ios真机环境
     */
    isIos(): boolean {
        return this.isCordova()
            && (this.platform.is('ios')
                || this.platform.is('ipad')
                || this.platform.is('iphone'));
    }
    
}
