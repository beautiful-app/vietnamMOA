import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {HomePage} from './home.page';
import {SharedModule} from '../shared/shared.module';
import {MatTreeModule} from '@angular/material';


const routes: Routes = [
    {
        path: '',
        component: HomePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        SharedModule,
        MatTreeModule,
    
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
