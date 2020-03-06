import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SalaryRoutingModule} from './salary-routing.module';
import {SalaryComponent} from './salary.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [SalaryComponent],
    imports: [
        CommonModule,
        SalaryRoutingModule,
        SharedModule,
    ]
})
export class SalaryModule {
}
