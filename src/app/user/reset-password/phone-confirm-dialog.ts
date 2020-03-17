import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {style} from '@angular/animations';

@Component({
    selector: 'app-phone-confirm-dialog',
    template: `
        <div *ngIf="mode">
            <h4 class="confirm-title" style="font-size: 17px;margin-top: 5px;">手机号确认</h4>
            <p class="" style="font-size: 15px;margin-bottom: 5px;">我们要向一下手机号发送验证码:</p>
            <span style="font-size: 15px;margin-top: -4px">{{cellphone}}</span>
            <div class="align-right">
                <button mat-button color="primary" (click)="close(false)">取消</button>
                <button mat-button color="primary" (click)="close(true)">确定</button>
            </div>
        </div>
        <div *ngIf="!mode">
            <p>该账号为设置手机号，请联系hr修改</p>
            <div class="align-right">
                <button mat-button color="primary" (click)="close(false)">好的</button>
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
        if(data) {
            this.mode = true;
            console.log('有手机号', data);
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
