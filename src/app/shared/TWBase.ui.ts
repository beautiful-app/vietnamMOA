import {LoadingController} from '@ionic/angular';

export abstract class TWBase {
    protected _loading: any;
    
    constructor(
        private _loadingCtrl?: LoadingController
    ) {
    
    }
    
    protected async loadingShow(message?: string) {
        this._loading = await this._loadingCtrl.create({
            message: message ? message : '加载中...',
        });
        this._loading.present();
    }
    
    protected async loadingDismiss() {
        if(this._loading) this._loading.dismiss();
    }
    
}
