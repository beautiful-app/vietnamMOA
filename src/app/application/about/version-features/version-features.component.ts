import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, LoadingController} from '@ionic/angular';
import {LoadingService} from 'src/app/shared/service/loading.service';
import {TWBase} from '../../../shared/TWBase.ui';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ApplicationService} from '../../../shared/service/application.service';
import {APP} from '../../../core/singleton.export';

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
        private loadingSV: LoadingService,
        private loadingCtrl: LoadingController,
        private router: Router,
        private location: Location,
        private appSV: ApplicationService
    ) {
        super();
    }
    
    ngOnInit() {
        // setTimeout(_ => {
        this.getData(this.page);
        // }, 10000);
    }
    
    getData(page: number) {
        this.appSV.getVersionFeaturesList(page).subscribe(r => {
            if(r) {
                let dataList = r.records;
                this.featuresList = this.featuresList.concat(dataList);
                if(this.infiniteScroll) this.infiniteScroll.complete();
                if(dataList.length < APP.versonFeaturesPZ) {
                    if(this.infiniteScroll) this.infiniteScroll.disabled = true;
                    this.noData = true;
                }
            }
        });
    }
    
    loadData($event) {
        setTimeout(_ => {
            // $event.target.complete();
            this.getData(++this.page);
        }, 1000);
        
    }
}
