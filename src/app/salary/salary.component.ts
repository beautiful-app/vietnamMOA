import {ChangeDetectorRef, Component, OnDestroy, QueryList, ViewChild} from '@angular/core';
import {datePicker, DatePickerOptions} from '../shared/entity/date-picker-options.vo';
import {Salary, ShowModeA, ShowModeB} from '../shared/entity/salary.vo';
import {DateUtil} from '../shared/utils/date.util';
import {SalaryService} from '../shared/service/salary.service';
import {select, Store} from '@ngrx/store';
import {USER} from '../shared/entity/user.bo';
import {TWBase} from '../shared/TWBase.ui';
import {delay} from 'rxjs/operators';
import {Lang} from '../shared/const/language.const';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion';
import {IonContent} from "@ionic/angular";
import {StoreTypeEnum} from "../core/ngrx/store-type.enum";

@Component({
    selector: 'app-salary',
    templateUrl: './salary.component.html',
    styleUrls: ['./salary.component.scss'],
})
export class SalaryComponent extends TWBase implements OnDestroy {
    @ViewChild('datePicker', {static: false}) datePicker: any;
    @ViewChild('accordion', {static: false}) accordion: QueryList<MatAccordion>;
    @ViewChild(IonContent, {static: false}) content: IonContent;
    customPickerOptions: DatePickerOptions = datePicker.options(this);
    salary: Salary;
    hasGetData: boolean = false;
    subscribers = [];
    close = 0;
    chilPanel = new Set();
    hasData = false;
    screenHeight: any;
    expandedHeight = 40;
    
    constructor(
        private salarySV: SalaryService,
        private store: Store<StoreType>,
        public cdr: ChangeDetectorRef,
    ) {
        super();
        this.screenHeight = window.innerHeight;
        // 从缓存中获取已保存的数据
        this.salarySV.getDataFromStorage().subscribe(r => {
            // 展示缓存数据
            if (r) this.salary = r;
            // 使用基础模板数据
            else this.salary = ShowModeB;
            this.salarySV.languageProcessing(this.salary).subscribe(r => {
                this.subscribers[0] = this.store.pipe(select(StoreTypeEnum.user), delay(2000)).subscribe(_ => {
                    // 用户为激活状态，并且还未获取数据
                    if (!this.hasGetData && USER.get().isActive) {
                        this.hasGetData = true;
                        this.salary.date = DateUtil.getYearMonth();
                        this.getSalary(DateUtil.getFullYear(), DateUtil.getCurrentMonth());
                        // this.getSalary(DateUtil.getFullYear(), 6);
                    }
                });
            });
        });
        
        // 退出登录：初始化数据获取标识,初始化salary数据
        this.subscribers[1] = this.store.pipe(select(StoreTypeEnum.userLogout)).subscribe(r => {
            if (r) {
                this.hasGetData = false;
                this.salarySV.initShowModeB().subscribe(_ => {
                    this.salary = ShowModeB;
                });
            }
        });
    }
    
    /**
     * 获取薪资数据
     * @param: {year} 年份
     * @param: {month} 月份
     */
    getSalary(year, month) {
        this.loadingShow();
        this.salarySV.getData(year, month).pipe(delay(2000)).subscribe(r => {
                // 当月没有数据
                if (!r) this.hasData = false;
                else {
                    if (r.hasError) this.hasData = false;
                    else {
                        this.hasData = true;
                        ShowModeA.date = this.salary.date;
                        this.salarySV.languageProcessing(ShowModeA).subscribe(_ => {
                            this.salarySV.salaryDataProcessing(ShowModeA, r);
                            this.salary = ShowModeA;
                        });
                    }
                }
                
                if (!this.hasData) {
                    if (!r.hasError) this.presentToast(Lang.Lang_711);
                    this.salarySV.initShowModeB().subscribe(_ => {
                        ShowModeB.date = this.salary.date;
                        this.salary = ShowModeB;
                    });
                }
            },
            null,
            () => {
                this.loadingDismiss();
            }
        );
    }
    
    /**
     * 当前页面销毁后取消所有订阅
     */
    ngOnDestroy(): void {
        console.log('salary component has destroy!');
        this.subscribers.forEach(r => {
            if (r) r.unsubscribe();
        });
    }
    
    /**
     * 外层面板切换或者关闭后，关闭所有内层的面板,使其下次展开后是折叠状态而不是被打开状态
     */
    closeAllChilPanel() {
        this.chilPanel.forEach(r => {
            r.expanded = false;
        });
    }
    
    /**
     * 如果面板项展开后被底部遮挡，那么让页面向上滑动
     * {panel} MatExpansionPanel DOM对象
     */
    afterExpand(panel: MatExpansionPanel) {
        // panel到顶部的距离
        const panelToTop = panel['_body']['nativeElement']['offsetTop'];
        // panel body高度
        const panelBodyHeight = panel['_body']['nativeElement']['clientHeight'];
        // 展开后底部距离顶部高度
        const panelBottomToTop = panelBodyHeight + this.expandedHeight + panelToTop;
        // 差值
        const diffValue = panelBottomToTop - this.screenHeight;
        // 如果panel展开后的高度大于整个屏幕的高度，那么页面向上滚动
        if (diffValue > -50) this.content.scrollToBottom(500);
    }
    
    /**
     * 用户通过日期选择器选择后执行的方法与相应处理逻辑
     * */
    dateHandle(pick) {
        // 判断前后日期是否有变化
        let year = pick.year.text;
        let month = pick.month.text;
        let pickerDate = year + '/' + month;
        // 重新获取数据
        if (this.salary.date != pickerDate) {
            this.salary.date = pickerDate;
            this.getSalary(year, month);
        }
    }
}
