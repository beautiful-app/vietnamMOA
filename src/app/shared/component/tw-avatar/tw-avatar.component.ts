import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'tw-avatar',
    templateUrl: './tw-avatar.component.html',
    styleUrls: ['./tw-avatar.component.scss'],
})
/**
 * @Description: 用户头像组件
 */
export class TwAvatarComponent implements OnInit {
    
    @Input() avatar: string;           // 图片地址
    @Input() slot: string = 'start';
    
    constructor() {
    
    }
    
    ngOnInit() {
        console.log('slot', this.slot);
    }
    
}
