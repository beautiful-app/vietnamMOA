import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VersionFeaturesRoutingModule} from './version-features-routing.module';
import {VersionFeaturesComponent} from './version-features.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
    declarations: [VersionFeaturesComponent],
    imports: [
        CommonModule,
        VersionFeaturesRoutingModule,
        SharedModule
    ],
    providers: []
})
export class VersionFeaturesModule {
}
