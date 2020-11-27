import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SalaryRoutingModule} from './salary-routing.module';
import {SalaryComponent} from './salary.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [SalaryComponent],
    imports: [
        SalaryRoutingModule,
        SharedModule,
        FormsModule,
    ]
})
export class SalaryModule {
}
