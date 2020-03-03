import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Tabs} from './tabs';
import {UserResolve} from '../shared/service/user-resolve.service';
import {DemoAccordionAccordionComponent} from '../shared/components/accordion/demo/accordion';

const routes: Routes = [
    {
        path: 'tabs',
        component: Tabs,
        children: [
            {
                path: 'salary',
                loadChildren: () => import('../salary/salary.module').then(m => m.SalaryModule),
            },
            {
                path: 'home',
                loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
                component: DemoAccordionAccordionComponent
            },
            {
                path: 'application',
                loadChildren: () => import('../application/application.module').then(m => m.ApplicationModule),
                // resolve: {user: UserResolve}
            }
        ]
    },
    {
        path: '', redirectTo: 'tabs/home', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsRoutingModule {

}

