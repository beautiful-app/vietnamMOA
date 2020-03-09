import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VersionDetailRoutingModule} from './version-detail-routing.module';
import {VersionDetailComponent} from './version-detail.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [VersionDetailComponent],
    imports: [
        CommonModule,
        VersionDetailRoutingModule,
        IonicModule
    ]
})
export class VersionDetailModule {

}
