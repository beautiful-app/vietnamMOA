import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TwHeaderComponent} from './tw-header/tw-header.component';
import {TwAvatarComponent} from './tw-avatar/tw-avatar.component';
import {IonicModule} from '@ionic/angular';
import {MatButtonModule} from '@angular/material';


@NgModule({
    declarations: [TwHeaderComponent, TwAvatarComponent],
    exports: [
        TwAvatarComponent,
        TwHeaderComponent
    
    ],
    imports: [
        CommonModule,
        IonicModule,
        MatButtonModule,
    ]
})
export class TwComponentModule {
}
