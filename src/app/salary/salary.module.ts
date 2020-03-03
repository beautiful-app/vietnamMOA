import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SalaryRoutingModule} from './salary-routing.module';
import {SalaryComponent} from './salary.component';
import {AccordionModule} from '../shared/components/accordion';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [SalaryComponent],
    imports: [
        CommonModule,
        SalaryRoutingModule,
        AccordionModule,
        SharedModule
    ]
})
export class SalaryModule {
}
