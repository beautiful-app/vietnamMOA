import {Injectable} from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';
import {Lang} from '../const/language.const';

@Injectable({
    providedIn: 'root'
})
/**
 * loading提示服务,专门用于http拦截请求异常时的提示使用
 */
export class PromptService {
    private _loading: any;      // loding对象
    private _toast: any;        // toast对象
    private _networkErrorOnShow: boolean = false;//  网络错误
    
    constructor(
        private loadingCtrl: LoadingController
    ) {
        this._loading = this.loadingCtrl;
        this._toast = new ToastController();
    }
    
    /**
     *  控制toast提示的出现频率，实现多次http请求，能友好而不频繁地提示网络相关问题
     */
    networkErrorToast() {
        if (!this._networkErrorOnShow) {
            this._networkErrorOnShow = true;
            this.presentToast(Lang.Lang_812);
            setTimeout(_ => {
                this._networkErrorOnShow = false;
            }, 3000);
        }
    }
    
    /**
     * 显示toast
     */
    presentToast(message: string | number, position?: 'bottom' | 'middle', duration?: number, header?: string, closeButtons?: string[]) {
        duration = duration ? duration : 1500;
        this._toast.create({
            header: header,
            message: String(message),
            // duration: duration ? duration : 1500,
            duration: duration,
            position: position ? position : 'top',
            cssClass: 'toast',
            mode: 'ios'
        }).then(toast => {
            toast.present();
        });
    }
    
}
