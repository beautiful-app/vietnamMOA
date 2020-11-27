import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lang} from '../../const/language.const';
import {RouterService} from '../../service/router.service';

@Component({
    selector: 'tw-header',
    templateUrl: './tw-header.component.html',
    styleUrls: ['./tw-header.component.scss'],
})
/**
 * 应用头部组件
 */
export class TwHeaderComponent implements OnInit {
    
    @Input() title: any;						      // 标题
    @Input() backButton: boolean = true;              // 是否显示返回箭头
    @Input() buttonTitle: string = Lang.Lang_910;     // 返回 文字显示
    @Input() showButtonRight: boolean = false;		  // 右边按钮是否显示
    @Output() buttonAction = new EventEmitter();      // 事件通知
    @Input() showLoadingButtonRight: boolean = false; // 右边按钮的loading效果开关
    
    constructor(private routeSV: RouterService) {
    }
    
    ngOnInit() {
    }
    
    actionEmit() {
        this.buttonAction.emit();
    }
    
    back() {
        this.routeSV.back();
    }
}
