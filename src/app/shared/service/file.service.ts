import {Injectable} from '@angular/core';
import {File} from '@ionic-native/file/ngx';
import {DeviceService} from './device.service';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {TWBase} from '../TWBase.ui';
import {Store} from '@ngrx/store';
import {downloadApk} from '../../core/ngrx/actions/application.actions';


@Injectable({
	providedIn: 'root'
})
/**
 * 文件操作类相关的服务类
 */
export class FileService extends TWBase {
	
	constructor(private file: File,
	            private deviceSV: DeviceService,
	            private ft: FileTransfer,
	            private fo: FileOpener,
	            private store: Store<{ downloadApk: 'downloadApk' }>
	) {
		super();
	}
	
	/**
	 * 文件下载
	 * @param:  {url} 下载地址
	 * @param: {relativePath} 保存的地址
	 * @return:  void
	 */
	downloadFile(url: string, relativePath: string) {
		const fileTransfer = this.ft.create();
		fileTransfer.download(encodeURI(url), this.deviceSV.deviceFilePath() + relativePath).then((entry) => {
			}, (error) => {
				this.store.dispatch(downloadApk({rate: -1}));
			}
		);
		
		let timer = null;
		fileTransfer.onProgress((event: ProgressEvent) => {
			//下载进度
			let progress = Math.floor(event.loaded / event.total * 100);
			if (progress >= 100) {
				setTimeout(_ => {
					this.openFile(null, null);
					this.store.dispatch(downloadApk({rate: -1}));
				}, 2000);
			}
			if (!timer || progress >= 100) {
				timer = setTimeout(() => {
					this.store.dispatch(downloadApk({rate: progress}));
					timer = null;
				}, 1200);
			}
		});
	}
	
	/**
	 * 打开安卓安装文件
	 */
	openFile(targetPath: string, fileMimeType: string) {
		let url = this.deviceSV.deviceFilePath() + 'android.apk';
		let mime = 'application/vnd.android.package-archive';
		this.fo.open(url, mime)
		.then(r => {
				this.presentToast('open file success:' + JSON.stringify(r));
			}
		)
		.catch(
			r => {
				this.presentToast('打开文件出错:' + JSON.stringify(r));
			}
		);
	}
}
