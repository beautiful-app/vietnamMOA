import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../../shared/service/application.service';

@Component({
    selector: 'app-version-detail',
    templateUrl: './version-detail.component.html',
    styleUrls: ['./version-detail.component.scss'],
})
export class VersionDetailComponent implements OnInit {
    contnet: string;    // 内容
    
    constructor(
        private route: ActivatedRoute,
        private appSV: ApplicationService
    ) {
    }
    
    ngOnInit() {
        setTimeout(_ => {
            let id = this.route.snapshot.paramMap.get('id');
            this.appSV.getVersionFeaturesDetail(Number(id)).subscribe(r => {
                if (r) this.contnet = r.data;
                else this.contnet = '';
            });
        }, 500);
    }
}
