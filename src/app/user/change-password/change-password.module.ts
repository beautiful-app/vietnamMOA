import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChangePasswordRoutingModule} from './change-password-routing.module';
import {ChangePasswordComponent} from './change-password.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [ChangePasswordComponent],
    imports: [
        CommonModule,
        ChangePasswordRoutingModule,
        SharedModule,
        FormsModule
    ]
})
export class ChangePasswordModule {
}
