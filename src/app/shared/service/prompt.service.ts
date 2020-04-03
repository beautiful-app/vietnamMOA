import {Injectable} from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';

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
        console.log('toast实例化了');
    }
    
    networkErrorToast() {
        if(!this._networkErrorOnShow) {
            this._networkErrorOnShow = true;
            this.presentToast('网络错误，请从新尝试');
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
            // setTimeout(_ => {
            //     toast.dismiss();
            // }, duration);
        });
    }
    
    async presentLoading() {
        
        await this.loadingCtrl.create({
            message: 'Please wait...',
            duration: 2000,
        }).then(loading => {
            loading.present();
        });
        // this.loading.present();
    }
    
    
    hide() {
        // this.loading.dismiss();
    }
}
