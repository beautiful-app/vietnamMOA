import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TwHeaderComponent} from './tw-header/tw-header.component';
import {TwAvatarComponent} from './tw-avatar/tw-avatar.component';
import {IonicModule} from '@ionic/angular';
import {MatButtonModule} from '@angular/material';
import {TwSuccessComponent} from './tw-success/tw-success.component';


@NgModule({
    declarations: [TwHeaderComponent, TwAvatarComponent, TwSuccessComponent],
    exports: [
        TwAvatarComponent,
        TwHeaderComponent,
        TwSuccessComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        MatButtonModule,
    ],
    entryComponents: [TwSuccessComponent]
})
export class TwComponentModule {
}
