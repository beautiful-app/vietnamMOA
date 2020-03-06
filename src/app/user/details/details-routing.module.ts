import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailsComponent} from './details.component';

const routes: Routes = [
    // {path: '', loadChildren: () => import('./details.module').then(m => m.DetailsModule)},
    {path: '', component: DetailsComponent},
    {path: 'change-info/:cellphone', loadChildren: () => import('./change-info/change-info.module').then(m => m.ChangeInfoModule)}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailsRoutingModule {
}
