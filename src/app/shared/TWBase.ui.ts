import {LoadingController, ToastController} from '@ionic/angular';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {tipsMode, TwSuccessComponent} from './component/tw-success/tw-success.component';
import {Lang} from './const/language.const';
import {DeviceService} from './service/device.service';
import {GCONST} from '../core/singleton.export';
import {ObjectUtil} from './utils/object.util';

export abstract class TWBase {
    protected _loadCtrl: LoadingController;
    private _loading: any;
    protected _toast: ToastController;
    
    constructor() {
        this._loadCtrl = new LoadingController();
        this._toast = new ToastController();
    }
    
    protected async presentToast(message: string | number, position?: 'bottom' | 'middle', duration?: number, header?: string, closeButtons?: string[]) {
        duration = duration ? duration : 1500;
        const toast = await this._toast.create({
            header: header,
            message: String(message),
            // duration: duration ? duration : 1500,
            duration: duration,
            position: position ? position : 'top',
            cssClass: 'toast',
            mode: 'ios'
        }).then(r => {
            r.present();
            setTimeout(_ => {
                r.dismiss();
            }, duration);
        });
    }
    
    successTip(dialog: MatDialog, mode?: { mode?: tipsMode, time?: Number }): Observable<any> {
        // mode = {mode: tipsMode.successMode2, time: 2000};
        return this.openDialog(dialog, null, TwSuccessComponent, mode);
    }
    
    protected openDialog(dialog: MatDialog, deviceSV: DeviceService, component: any, date?: any): Observable<boolean | any> {
        return new Observable<boolean>(o => {
            const dialogRef = dialog.open(component, {
                disableClose: true,
                panelClass: 'custom-dialog-container',
                data: date ? date : {}
            });
            if(deviceSV) deviceSV.dialogMode(dialogRef);
            dialogRef.afterClosed().subscribe(r => {
                if(deviceSV) deviceSV.dialogMode(false);
                o.next(r);
            });
        });
    }
    
    
    protected async loadingShow(message?: string) {
        this._loading = await this._loadCtrl.create({
            message: message ? message : Lang.Lang_815,
            cssClass: 'custom-class custom-loading',
            mode: 'md',
            spinner: 'lines',
        });
        GCONST.Loading.push(this._loading);
        this._loading.present();
    }
    
    protected async loadingDismiss() {
        if(this._loading) await this._loading.dismiss();
        // todo 全局控制loading
    }
    
    protected loadingDismissAll(): Observable<any> {
        return new Observable<any>(o => {
            if(ObjectUtil.isNotNull(GCONST.Loading)) {
                GCONST.Loading.forEach(r => {
                    r.dismiss();
                });
                GCONST.Loading = [];
            }
            o.next();
        });
    }
    
    
}
