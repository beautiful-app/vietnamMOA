import {Injectable, Injector} from '@angular/core';
import {Platform} from '@ionic/angular';
import {File} from '@ionic-native/file/ngx';
import {TWBase} from '../TWBase.ui';
import {RouterService} from './router.service';
import {APP} from '../../core/singleton.export';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Lang} from '../const/language.const';

// 两次退出操作记录常量
enum exitMark {
    init,
    step1,
    finish
}

@Injectable({
    providedIn: 'root'
})
export class DeviceService extends TWBase {
    _dialogMode: any = false;   // 是否打开了dialog
    _exitApp = 0;               // 退出app计数
    exitTimeOut: any;           // 返回退出app时间
    
    constructor(private platform: Platform,
                private file: File,
                private routerSV: RouterService,
                private inj: Injector,
                private naviteBr: InAppBrowser,
    ) {
        super();
    }
    
    /**
     * 物理返回键监听
     */
    androidBackButtonRegister() {
        this.platform.backButton.subscribeWithPriority(29, () => {
            if (!this._dialogMode) {
                if (!this.routerSV.back()) {
                    // 指定时间内用户仅手动触发一次物理返回
                    if (this._exitApp < exitMark.finish) {
                        if (this.exitTimeOut) clearTimeout(this.exitTimeOut);
                        if (this._exitApp == exitMark.init) this.presentToast(Lang.Lang_01);
                        this._exitApp += exitMark.step1;
                    } else navigator['app'].exitApp();
                    this.exitTimeOut = setTimeout(_ => {
                        this._exitApp = exitMark.init;
                    }, APP.backButtonTime);
                }
            } else {
                if (this.dialogMode) this._dialogMode.close();
                this._dialogMode = false;
            }
        });
    }
    
    /**
     * 在别处对本服务实例中的dialog对象进行赋值引用的函数
     */
    dialogMode(dialogRef: any) {
        this._dialogMode = dialogRef;
    }
    
    /**
     *  返回本软件在设备中的存储路径
     */
    deviceFilePath(): string {
        let path = '';
        if (this.isAndroid()) {
            path = this.file.externalDataDirectory;
        } else if (this.isIos()) {
            path = this.file.syncedDataDirectory;
        }
        return path;
    }
    
    /**
     *  通过ios内置浏览器打开网址
     * @param:  {url} 要打开的网址
     * @return:  void
     */
    openUrlInNaviteBrowser(url: string = 'baidu.com') {
        const browser = this.naviteBr.create(url, '_system');
    }
    
    /**
     * 是否android真机环境
     */
    isAndroid(): boolean {
        return this.isCordova() && this.platform.is('android');
    }
    
    /**
     *  是否支持cordova
     */
    isCordova(): boolean {
        return this.platform.is('cordova');
    }
    
    /**
     * 是否ios真机环境
     */
    isIos(): boolean {
        return this.isCordova()
            && (this.platform.is('ios')
                || this.platform.is('ipad')
                || this.platform.is('iphone'));
    }
}


