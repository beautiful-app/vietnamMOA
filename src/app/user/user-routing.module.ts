import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    {path: 'details', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule)},
    {path: 'update-password', loadChildren: () => import('./update-password/update-password.module').then(m => m.UpdatePasswordModule)},
    {path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {
}

