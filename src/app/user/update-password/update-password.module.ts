import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UpdatePasswordRoutingModule} from './update-password-routing.module';
import {UpdatePasswordComponent} from './update-password.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [UpdatePasswordComponent],
    imports: [
        CommonModule,
        UpdatePasswordRoutingModule,
        SharedModule,
        FormsModule
    ]
})
export class UpdatePasswordModule {
}
