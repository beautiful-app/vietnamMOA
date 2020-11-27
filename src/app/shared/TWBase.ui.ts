import {LoadingController, ToastController} from '@ionic/angular';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {tipsMode, TwSuccessComponent} from './component/tw-success/tw-success.component';
import {Lang} from './const/language.const';
import {DeviceService} from './service/device.service';
import {GCONST} from '../core/singleton.export';

/**
 *  提示、加载中等页面常用交互集合
 */
export abstract class TWBase {
	protected _loadCtrl: LoadingController;
	private _loading: any;
	protected _toast: ToastController;
	
	constructor() {
		this._loadCtrl = new LoadingController();
		this._toast = new ToastController();
	}
	
	/**
	 *  弹出toast提示
	 * @param: {message} 提示的文字信息
	 * @param: {position} 显示位置
	 * @param: {duration} 显示时间
	 * @param: {header} 头标题显示信息
	 * @param: {closeButtons} 关闭按钮数组
	 * @return: void
	 */
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
	
	/**
	 *  成功打钩提示
	 * @param:  {dialog} MatDialog对象
	 * @param: {mode} 显示配置
	 * @return:  Observable<any>
	 */
	successTip(dialog: MatDialog, mode?: { mode?: tipsMode, time?: Number }): Observable<any> {
		return this.openDialog(dialog, null, TwSuccessComponent, mode);
	}
	
	/**
	 *  打开dialog页面
	 * @param: {dialog} Matdialog对象
	 * @param: {deviceSV} DeviceService 服务
	 * @param: {component} 需要显示的组件
	 * @param: {data} 数据
	 * @return: Observable<boolean | any>
	 */
	protected openDialog(dialog: MatDialog, deviceSV: DeviceService, component: any, data?: any): Observable<boolean | any> {
		return new Observable<boolean>(o => {
			const dialogRef = dialog.open(component, {
				disableClose: true,
				panelClass: 'custom-dialog-container',
				data: data ? data : {}
			});
			if (deviceSV) deviceSV.dialogMode(dialogRef);
			dialogRef.afterClosed().subscribe(r => {
				if (deviceSV) deviceSV.dialogMode(false);
				o.next(r);
			});
		});
	}
	
	/**
	 *  loading提示信息
	 * @param:  {message} 提示信息
	 * @return:  void
	 */
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
	
	/**
	 *  关闭提示信息
	 */
	protected async loadingDismiss() {
		if (this._loading) await this._loading.dismiss();
		// todo 全局控制loading
	}
}
