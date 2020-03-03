import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {LoadingService} from 'src/app/shared/service/loading.service';
import {TWBase} from '../../../shared/TWBase.ui';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ApplicationService} from '../../../shared/service/application.service';

@Component({
    selector: 'app-version-features',
    templateUrl: './version-features.component.html',
    styleUrls: ['./version-features.component.scss'],
})
export class VersionFeaturesComponent extends TWBase implements OnInit {
    featuresList: any[];
    
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
        this.appSV.getVersionFeaturesList().subscribe(r => {
            this.featuresList = r.records;
        });
    }
    
    
}
