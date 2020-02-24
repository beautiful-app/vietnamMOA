import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CenterComponent} from './center/center.component';


const routes: Routes = [
    {path: '', redirectTo: 'center'},
    {path: 'center', loadChildren: () => import('./center/center.module').then(m => m.CenterModule)},
    {path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
