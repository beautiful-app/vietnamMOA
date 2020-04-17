import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-phone-confirm-dialog',
    template: `
        <div *ngIf="mode">
            <h4 class="confirm-title app-primary" style="font-size: 16px;margin-top: 5px;" translate>Lang_89_1</h4>
            <p class="" style="font-size: 15px;margin-bottom: 5px;" translate>Lang_89_2
                <span style="font-size: 15px;margin-top: -4px">{{cellphone}}</span>
            </p>
            <div class="align-right">
                <button mat-button color="primary" (click)="close(false)"> {{ 'Lang_89_3' | translate }} </button>
                <button mat-button color="primary" (click)="close(true)"> {{ 'Lang_89_4' | translate }} </button>
            </div>
        </div>
        <div *ngIf="!mode">
            <p translate>Lang_914</p>
            <div class="align-right">
                <button mat-button color="primary" (click)="close(false)">{{ 'Lang_89_4' | translate}}</button>
            </div>
        </div>
    `,
    styles: ['h1 { font-weight: normal; }']
})
export class PhoneConfirmDialog {
    mode: boolean = false;
    cellphone: string;
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<PhoneConfirmDialog>,
    ) {
        if(data.cellphone && data.cellphone.length > 0) {
            this.mode = true;
            this.numberProcessing(data.cellphone);
        }
    }
    
    close(button: boolean) {
        this.dialogRef.close(button);
    }
    
    // 把手机中间部分用*号隐藏
    numberProcessing(number: string) {
        this.cellphone = number.substring(0, 3) + '*****' + number.substring(number.length - 3, number.length);
    }
}
