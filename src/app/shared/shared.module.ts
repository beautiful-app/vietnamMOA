import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollMenuComponent} from './components/scroll-menu';
import {TranslateModule} from '@ngx-translate/core';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule, MatListModule, MatRippleModule
} from '@angular/material';


@NgModule({
    declarations: [
        ScrollMenuComponent
    ],
    imports: [
        CommonModule,
        
        IonicModule,
        TranslateModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatRippleModule,
    ],
    exports: [
        IonicModule,
        TranslateModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatRippleModule,
    ]
})
export class SharedModule {
}
