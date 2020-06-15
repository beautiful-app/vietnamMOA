import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export enum tipsMode {
	successMode1,
	successMode2,
	failed
}

@Component({
	selector: 'app-tw-success',
	templateUrl: './tw-success.component.html',
	styleUrls: ['./tw-success.component.scss'],
})
/**
 * @Description: 成功打钩提示组件
 */
export class TwSuccessComponent implements OnInit {
	@Input() mode: tipsMode;
	tipsMode = tipsMode;
	closeTime: number;
	
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<TwSuccessComponent>,
	) {
		this.mode = data.mode ? data.mode : tipsMode.successMode2;
		this.closeTime = data.time ? data.time : 2000;
	}
	
	ngOnInit() {
		setTimeout(_ => {
			this.dialogRef.close();
		}, this.closeTime);
	}
	
}
