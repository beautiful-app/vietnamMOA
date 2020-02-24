import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from './about.component';


const routes: Routes = [
    {path: '', component: AboutComponent},
    {path: 'version-features', loadChildren: () => import('./version-features/version-features.module').then(m => m.VersionFeaturesModule)}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutRoutingModule {
}
