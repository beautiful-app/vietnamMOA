import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VersionFeaturesRoutingModule} from './version-features-routing.module';
import {VersionFeaturesComponent} from './version-features.component';
import {SharedModule} from '../../../shared/shared.module';
import {LoadingService} from '../../../shared/service/loading.service';


@NgModule({
    declarations: [VersionFeaturesComponent],
    imports: [
        CommonModule,
        VersionFeaturesRoutingModule,
        SharedModule
    ],
    providers: [LoadingService]
})
export class VersionFeaturesModule {
}
