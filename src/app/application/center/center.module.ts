import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CenterRoutingModule} from './center-routing.module';
import {CenterComponent} from './center.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [CenterComponent],
    imports: [
        CommonModule,
        CenterRoutingModule,
        SharedModule
    ]
})
export class CenterModule {
}
