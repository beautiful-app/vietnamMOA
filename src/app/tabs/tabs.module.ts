import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Tabs} from './tabs';
import {TabsRoutingModule} from './tabs-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TabsRoutingModule,
    ],
    declarations: [
        Tabs,
    ],
    providers: [
    ]
})
export class TabsModule {


}
