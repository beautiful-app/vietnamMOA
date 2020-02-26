import {Component, OnInit} from '@angular/core';
import {UpgradeService} from '../upgrade/upgrade.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
    
    constructor(
        private upgrapdeSV: UpgradeService
    ) {
    }
    
    ngOnInit() {
    }
    
    checkUpdate() {
        this.upgrapdeSV.checkVersion();
    }
    
    checkUpdate1() {
        this.upgrapdeSV.checkVersion1();
        
    }
    
    checkUpdate2() {
        this.upgrapdeSV.checkVersion2();
    }
}
