import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChangeInfoRoutingModule} from './change-info-routing.module';
import {ChangeInfoComponent} from './change-info.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
    declarations: [ChangeInfoComponent],
    imports: [
        CommonModule,
        ChangeInfoRoutingModule,
        SharedModule,
    
    ]
})
export class ChangeInfoModule {
}
