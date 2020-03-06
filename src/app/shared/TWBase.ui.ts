import {LoadingController, ToastController} from '@ionic/angular';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';

export abstract class TWBase {
    protected _loading: LoadingController;
    protected _toast: ToastController;
    protected _dialog: MatDialog;
    
    constructor() {
        this._loading = new LoadingController();
        this._toast = new ToastController();
    }
    
    protected async presentToast(message: string | number, duration?: number, position?: 'bottom' | 'middle', header?: string, closeButtons?: string[]) {
        const toast = await this._toast.create({
            header: header,
            message: String(message),
            duration: duration ? duration : 1500,
            position: position ? position : 'top',
            cssClass: 'toast',
            mode: 'ios'
        });
        toast.present();
    }
    
    
    protected openDialog(dialog: MatDialog, component: any, date: any): Observable<boolean | any> {
        const dialogRef = dialog.open(component, {
            disableClose: true,
            panelClass: 'custom-dialog-container',
            data: date
        });
        
        return new Observable<boolean>(o => {
            dialogRef.afterClosed().subscribe(r => {
                o.next(r);
            });
        });
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
