import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TwHeaderComponent} from './tw-header/tw-header.component';
import {TwAvatarComponent} from './tw-avatar/tw-avatar.component';
import {IonicModule} from '@ionic/angular';
import {MatButtonModule, MatDialogModule, MatIconModule, MatProgressBarModule, MatRippleModule} from '@angular/material';
import {TwSuccessComponent} from './tw-success/tw-success.component';
import {TwLoadCompleteComponent} from './tw-load-complete/tw-load-complete.component';
import {TranslateModule} from '@ngx-translate/core';
import {UpgradeComponent} from './tw-upgrade/upgrade.component';
import {SharedModule} from '../shared.module';


@NgModule({
    declarations: [TwHeaderComponent, TwAvatarComponent, TwSuccessComponent, TwLoadCompleteComponent, UpgradeComponent],
    exports: [
        TwAvatarComponent,
        TwHeaderComponent,
        TwSuccessComponent,
        TwLoadCompleteComponent,
        UpgradeComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressBarModule,
        MatIconModule,
        MatRippleModule,
    ],
    entryComponents: [TwSuccessComponent, UpgradeComponent]
})
export class TwComponentModule {
}
