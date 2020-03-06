import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-phone-confirm-dialog',
    template: `
        <div *ngIf="mode">
            <h3>手机号确认</h3>
            <p class="">我们要向一下手机号发送验证码</p>
            <p>{{cellphone}}</p>
            <button mat-button color="primary" (click)="close(false)">取消</button>
            <button mat-button color="primary" (click)="close(true)">确定</button>
        </div>
        
        <div *ngIf="!mode">
            <p>该账号为设置手机号，请联系hr修改</p>
            <button mat-button color="primary" (click)="close(false)">好的</button>
        </div>
    
    `,
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
