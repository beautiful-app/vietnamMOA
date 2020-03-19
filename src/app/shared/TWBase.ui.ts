import {LoadingController, ToastController} from '@ionic/angular';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {tipsMode, TwSuccessComponent} from './component/tw-success/tw-success.component';
import {Lang} from './const/language.const';

export abstract class TWBase {
    protected _loadCtrl: LoadingController;
    private _loading: any;
    protected _toast: ToastController;
    protected _dialog: MatDialog;
    
    constructor() {
        this._loadCtrl = new LoadingController();
        this._toast = new ToastController();
    }
    
    protected async presentToast(message: string | number, position?: 'bottom' | 'middle', duration?: number, header?: string, closeButtons?: string[]) {
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
    
    successTip(dialog: MatDialog, mode?: tipsMode): Observable<any> {
        return this.openDialog(dialog, TwSuccessComponent, mode ? mode : tipsMode.successMode1);
    }
    
    protected openDialog(dialog: MatDialog, component: any, date?: any): Observable<boolean | any> {
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
        this._loading = await this._loadCtrl.create({
            message: message ? message : Lang.Lang_815,
            cssClass: 'custom-class custom-loading',
        });
        this._loading.present();
    }
    
    protected async loadingDismiss() {
        if(this._loading) await this._loading.dismiss();
    }
    
}
