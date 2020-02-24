import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    // {path: 'center', loadChildren: () => import('./center/center.module').then(m => m.CenterModule)},
    {path: 'details', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule)}
    // {path: 'login', component: LoginComponent},
    // {path: 'register', component: RegisterComponent},
    // {path: '**', component: RegisterComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {
}

