import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailsComponent} from './details.component';

const routes: Routes = [
    {path: '', component: DetailsComponent},
    {path: 'change-info/:phoneNumber', loadChildren: () => import('./change-info/change-info.module').then(m => m.ChangeInfoModule)}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailsRoutingModule {
}
