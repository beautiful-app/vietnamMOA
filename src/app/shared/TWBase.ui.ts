import {LoadingController, ToastController} from '@ionic/angular';
import {Observable} from 'rxjs';

export abstract class TWBase {
    protected _loading: LoadingController;
    protected _toast: ToastController;
    
    constructor() {
        this._loading = new LoadingController();
        this._toast = new ToastController();
    }
    
    protected async presentToast(message: string | number, duration?: number, position?: 'bottom' | 'middle', header?: string, closeButtons?: string[]) {
        const toast = await this._toast.create({
            header: header,
            message: String(message),
            duration: duration ? duration : 2200,
            position: position ? position : 'top',
            cssClass: 'toast',
            mode: 'ios'
            // buttons: closeButtons ? closeButtons : [
            //     {
            //         text: '关闭',
            //         role: 'cancel',
            //         handler: () => {
            //             console.log('Cancel clicked');
            //         }
            //     }
            // ]
        });
        toast.present();
    }
    
    protected async loadingShow(message?: string) {
        // this._loading = await this._loadingCtrl.create({
        // // this._loading = await this._loading.create({
        //     message: message ? message : '加载中...',
        // });
        // this._loading.present();
    }
    
    protected async loadingDismiss() {
        if(this._loading) this._loading.dismiss();
    }
    
}
