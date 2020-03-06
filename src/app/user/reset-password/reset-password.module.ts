import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResetPasswordRoutingModule} from './reset-password-routing.module';
import {ResetPasswordComponent} from './reset-password.component';
import {SharedModule} from '../../shared/shared.module';
import {PhoneConfirmDialog} from './phone-confirm-dialog';


@NgModule({
    declarations: [ResetPasswordComponent, PhoneConfirmDialog],
    imports: [
        CommonModule,
        ResetPasswordRoutingModule,
        SharedModule
    ],
    entryComponents: [PhoneConfirmDialog]
})
export class ResetPasswordModule {
}
