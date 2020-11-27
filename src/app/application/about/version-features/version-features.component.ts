import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, LoadingController} from '@ionic/angular';
import {TWBase} from '../../../shared/TWBase.ui';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ApplicationService} from '../../../shared/service/application.service';
import {APP} from '../../../core/singleton.export';
import {PromptService} from '../../../shared/service/prompt.service';
import {delay} from 'rxjs/operators';

@Component({
	selector: 'app-version-features',
	templateUrl: './version-features.component.html',
	styleUrls: ['./version-features.component.scss'],
})
export class VersionFeaturesComponent extends TWBase implements OnInit {
	featuresList: any[] = [];
	@ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
	page: number = 1;
	noData = false;
	
	constructor(
		private loadingSV: PromptService,
		private loadingCtrl: LoadingController,
		private router: Router,
		private location: Location,
		private appSV: ApplicationService
	) {
		super();
	}
	
	ngOnInit() {
		setTimeout(_ => {
			this.getData(this.page);
		}, 500);
	}
	
	/**
	 * 获取app的更新信息列表
	 * @param:  {page} 获取分页中的第几页数据
	 */
	getData(page: number) {
		this.appSV.getVersionFeaturesList(page).pipe(delay(500)).subscribe(r => {
			if (r) {
				let dataList = r.records;
				this.featuresList = this.featuresList.concat(dataList);
				if (this.infiniteScroll) this.infiniteScroll.complete();
				if (dataList.length < APP.versonFeaturesPZ) {   // 如果获取的数据长度小于每页长度(最后一页)
					if (this.infiniteScroll) this.infiniteScroll.disabled = true;
					this.noData = true;
				}
			}
		});
	}
	
	loadData() {
		this.getData(++this.page);
	}
}
