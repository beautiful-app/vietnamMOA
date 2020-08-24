import {ChangeDetectorRef, Component, OnDestroy, QueryList, ViewChild} from '@angular/core';
import {datePicker, DatePickerOptions} from '../shared/entity/date-picker-options.vo';
import {PlanAA, Salary} from '../shared/entity/salary.vo';
import {DateUtil} from '../shared/utils/date.util';
import {SalaryService} from '../shared/service/salary.service';
import {select, Store} from '@ngrx/store';
import {USER} from '../shared/entity/user.bo';
import {TWBase} from '../shared/TWBase.ui';
import {delay} from 'rxjs/operators';
import {Lang} from '../shared/const/language.const';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion';
import {IonContent} from "@ionic/angular";

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
    screenHeight: any;
    expandedHeight = 40;
    
    constructor(
        private salarySV: SalaryService,
        private store: Store<{ user: 'user', newVersion: 'newVersion', userLogout: 'userLogout' }>,
        public cdr: ChangeDetectorRef,
    ) {
        super();
        this.screenHeight = window.innerHeight;
        // 从缓存中获取已保存的数据
        this.salarySV.getDataFromStorage().subscribe(r => {
            // 展示缓存数据
            if (r) this.salary = r;
            // 使用基础模板数据
            else this.salary = PlanAA;
            this.salarySV.languageProcessing(this.salary).subscribe(r => {
                this.subscribers[0] = this.store.pipe(select('user'), delay(2000)).subscribe(_ => {
                    // 用户为激活状态，并且还未获取数据
                    if (!this.hasGetData && USER.get().isActive) {
                        this.hasGetData = true;
                        this.salary.date = DateUtil.getYearMonth();
                        this.getSalary(DateUtil.getFullYear(), DateUtil.getCurrentMonth());
                    }
                });
            });
        });
        
        // 退出登录：初始化数据获取标识,初始化salary数据
        this.subscribers[1] = this.store.pipe(select('userLogout')).subscribe(r => {
            if (r) {
                this.hasGetData = false;
                this.salarySV.reinitSalaryData().subscribe(_ => {
                    this.salary = PlanAA;
                });
            }
        });
        
    }
    
    /**
     * @Description: 用户通过日期选择器选择后执行的方法与相应处理逻辑
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
    
    /**
     * @Description: 获取薪资数据
     * @param: {year} 年份
     * @param: {month} 月份
     */
    getSalary(year, month) {
        this.loadingShow();
        this.salarySV.getData(year, month).pipe(delay(2000)).subscribe(r => {
                let notData = false;
                // 当月没有数据
                if (!r) notData = true;
                else {
                    if (r.hasError) notData = true;
                    else {
                        PlanAA.date = this.salary.date;
                        this.salary = PlanAA;
                        this.salarySV.languageProcessing(this.salary).subscribe();
                        this.salarySV.salaryDataProcessing(this.salary, r);
                    }
                }
                
                // if (notData) {
                //     if (!r.hasError) this.presentToast(Lang.Lang_711);
                //     this.salarySV.reinitSalaryData().subscribe(_ => {
                //         PlanAA.date = this.salary.date;
                //         // this.salary = PlanB;
                //         this.salarySV.reinitPlanA().subscribe(_ => {
                //             this.salary = PlanAA;
                //         });
                //     });
                // }
            },
            null,
            () => {
                this.loadingDismiss();
            }
        );
    }
    
    /**
     * @Description: 当前页面销毁后取消所有订阅
     */
    ngOnDestroy(): void {
        this.subscribers.forEach(r => {
            if (r) r.unsubscribe();
        });
    }
    
    stop($event) {
        console.log($event);
        $event.stopPropagation();
        $event.preventDefault();
    }
    
    closeAllChilPanel() {
        this.chilPanel.forEach(r => {
            r.expanded = false;
        })
    }
    
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
}
