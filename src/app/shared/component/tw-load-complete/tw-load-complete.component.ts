import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'tw-load-complete',
	templateUrl: './tw-load-complete.component.html',
	styleUrls: ['./tw-load-complete.component.scss'],
})
/**
 * @Description: 列表加载完成底部显示标识 
 */
export class TwLoadCompleteComponent implements OnInit {
	@Input() isShow: any;
	
	constructor() {
	}
	
	ngOnInit() {
	}
	
}
