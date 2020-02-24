import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VersionFeaturesComponent} from './version-features.component';


const routes: Routes = [
    {path: '', component: VersionFeaturesComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VersionFeaturesRoutingModule {
}
