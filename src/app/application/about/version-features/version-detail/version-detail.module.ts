import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VersionDetailRoutingModule} from './version-detail-routing.module';
import {VersionDetailComponent} from './version-detail.component';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
    declarations: [VersionDetailComponent],
    imports: [
        CommonModule,
        VersionDetailRoutingModule,
        SharedModule,
    ]
})
export class VersionDetailModule {

}
