import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Tabs} from './tabs';
import {TabsRoutingModule} from './tabs-routing.module';
import {SharedModule} from '../shared/shared.module';
import {UserResolve} from '../shared/service/user-resolve.service';
import {AccordionModule} from '../shared/components/accordion';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TabsRoutingModule,
        AccordionModule
    ],
    declarations: [
        Tabs,
    ],
    providers: [
        UserResolve
    ]
})
export class TabsModule {


}
