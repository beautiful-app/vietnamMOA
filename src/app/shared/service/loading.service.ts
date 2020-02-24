import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    loading: any;
    
    constructor(
        private loadingCtrl: LoadingController
    ) {
    }
    
    async show() {
        this.loading = this.loadingCtrl.create({
            message: 'Please wait...',
            duration: 2000,
        });
        
        await this.loading.present();
        
    }
    
    hide() {
        this.loading.dismiss();
    }
}
