import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailsComponent} from '../details.component';
import {ChangeInfoComponent} from './change-info.component';


const routes: Routes = [
    {path: '', component: ChangeInfoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChangeInfoRoutingModule {
}
































