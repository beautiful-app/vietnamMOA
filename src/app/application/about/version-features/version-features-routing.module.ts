import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VersionFeaturesComponent} from './version-features.component';


const routes: Routes = [
    {path: '', component: VersionFeaturesComponent},
    {path: 'details/:id', loadChildren: () => import('./version-detail/version-detail.module').then(m => m.VersionDetailModule)}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VersionFeaturesRoutingModule {

}
