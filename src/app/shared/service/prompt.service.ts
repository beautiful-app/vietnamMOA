import {Injectable} from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';
import {Lang} from '../const/language.const';

@Injectable({
    providedIn: 'root'
})
export class PromptService {
    private _loading: any;
    private _toast: any;
    private _networkErrorOnShow: boolean = false;
    
    constructor(
        private loadingCtrl: LoadingController
    ) {
        this._loading = this.loadingCtrl;
        this._toast = new ToastController();
    }
    
    networkErrorToast() {
        if(!this._networkErrorOnShow) {
            this._networkErrorOnShow = true;
            this.presentToast(Lang.Lang_812);
            setTimeout(_ => {
                this._networkErrorOnShow = false;
            }, 3000);
        }
    }
    
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
    
    async presentLoading() {
        await this.loadingCtrl.create({
            message: 'Please wait...',
            duration: 2000,
        }).then(loading => {
            loading.present();
        });
    }
    
    
    hide() {
    }
}
