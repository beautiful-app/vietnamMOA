import {forwardRef, Inject, Injectable, Injector, Optional, SkipSelf} from '@angular/core';
import {Platform} from '@ionic/angular';
import {File} from '@ionic-native/file/ngx';
import {TWBase} from '../TWBase.ui';
import {RouterService} from './router.service';
import {APP} from '../../core/singleton.export';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Lang} from '../const/language.const';
import {statusStyle} from '../const/status-style.enum';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {StringUtil} from '../utils/string.util';
import {route} from '../const/route.enum';

enum exitMark {
    init,
    step1,
    finish
}

@Injectable({
    providedIn: 'root'
})
export class DeviceService extends TWBase {
    number: number = 5;
    _dialogMode: any = false;
    _exitApp = 0;
    exitTimeOut: any;
    
    constructor(private platform: Platform,
                private file: File,
                private routerSV: RouterService,
                private inj: Injector,
                private naviteBr: InAppBrowser,
                private statusBar: StatusBar
    ) {
        super();
    }
    
    // 物理返回键监听
    androidBackButtonRegister() {
        this.platform.backButton.subscribeWithPriority(29, () => {
            if(!this._dialogMode) {
                if(!this.routerSV.back()) {
                    // 指定时间内用户仅手动触发一次物理返回
                    if(this._exitApp < exitMark.finish) {
                        if(this.exitTimeOut) clearTimeout(this.exitTimeOut);
                        this.presentToast(Lang.Lang_01);
                        this._exitApp += exitMark.step1;
                    } else navigator['app'].exitApp();
                    
                    this.exitTimeOut = setTimeout(_ => {
                        this._exitApp = exitMark.init;
                    }, APP.backButtonTime);
                }
                this.presentToast('监听到物理返回键', 'bottom');
            } else {
                this.presentToast('监听到物理返回键，关闭dialog', 'bottom');
                if(this.dialogMode) this._dialogMode.close();
                this._dialogMode = false;
            }
        });
    }
    
    
    dialogMode(dialogRef: any) {
        this._dialogMode = dialogRef;
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
    
    openUrlInNaviteBrowser(url: string) {
        const browser = this.naviteBr.create('http://baidu.com', '_system');
    }
    
    /**
     * 是否android真机环境
     */
    isAndroid(): boolean {
        return this.isCordova() && this.platform.is('android');
    }
    
    /**
     * @name 是否支持cordova
     */
    isCordova(): boolean {
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
    
    
    setStatusBar(style: number) {
        switch (style) {
            case statusStyle.appDefault:
                this.statusBar.overlaysWebView(false);
                setTimeout(_ => {
                    this.statusBar.backgroundColorByHexString('#3dc2ff');
                }, 100);
                break;
            case statusStyle.overlaysWebView:
                this.statusBar.overlaysWebView(true);
                break;
        }
    }
    
    dialog() {
        
        console.log('jjj', this.dialogMode);
    }
}


