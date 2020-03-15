import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
    MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule,
    MatInputModule, MatListModule, MatNativeDateModule, MatRippleModule, MatTreeModule
} from '@angular/material';
import {TwComponentModule} from './component/tw-component.module';


@NgModule({
    declarations: [],
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
        MatTreeModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatDatepickerModule,
        TwComponentModule,
        
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
        MatTreeModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatDatepickerModule,
        TwComponentModule,
    ]
})
export class SharedModule {
}
