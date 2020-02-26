import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UpgradeComponent} from './upgrade.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatProgressBarModule, MatRadioModule, MatSliderModule} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [UpgradeComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatDialogModule,
        FormsModule,
        MatProgressBarModule,
        MatRadioModule,
        MatSliderModule
    ],
    entryComponents: [UpgradeComponent],
})

export class UpgradeModule {
}
