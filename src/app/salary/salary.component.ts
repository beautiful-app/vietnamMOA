import {Component, OnDestroy, ViewChild} from '@angular/core';
import {datePicker, DatePickerOptions} from '../shared/entity/date-picker-options.vo';
import {PlanA, PlanB, Salary} from '../shared/entity/salary.vo';
import {DateUtil} from '../shared/utils/date.util';
import {SalaryService} from '../shared/service/salary.service';
import {select, Store} from '@ngrx/store';
import {USER} from '../shared/entity/user.bo';
import {TWBase} from '../shared/TWBase.ui';
import {delay} from 'rxjs/operators';
import {Lang} from '../shared/const/language.const';


@Component({
    selector: 'app-salary',
    templateUrl: './salary.component.html',
    styleUrls: ['./salary.component.scss'],
})
export class SalaryComponent extends TWBase implements OnDestroy {
    @ViewChild('datePicker', {static: false}) datePicker: any;
    
    customPickerOptions: DatePickerOptions = datePicker.options(this);
    salary: Salary;
    hasGetData: boolean = false;
    subscribers = [];
    
    constructor(
        private salarySV: SalaryService,
        private store: Store<{ user: 'user', newVersion: 'newVersion', userLogout: 'userLogout' }>,
    ) {
        super();
        // 从缓存中获取已保存的数据
        this.salarySV.getDataFromStorage().subscribe(r => {
            // 展示缓存数据
            if (r) this.salary = r;
            // 使用基础模板数据
            else this.salary = PlanA;
            this.salarySV.languageProcessing(this.salary).subscribe(r => {
                console.log(this.salary);
                this.subscribers[0] = this.store.pipe(select('user'), delay(2000)).subscribe(_ => {
                    // 用户为激活状态，并且还未获取数据
                    if (!this.hasGetData && USER.get().isActive) {
                        this.hasGetData = true;
                        this.salary.date = DateUtil.getYearMonth();
                        // this.getSalary(DateUtil.getFullYear(), DateUtil.getCurrentMonth());
                    }
                });
            });
        });
        return;
        // 退出登录：初始化数据获取标识,初始化salary数据
        this.subscribers[1] = this.store.pipe(select('userLogout')).subscribe(r => {
            if (r) {
                this.hasGetData = false;
                this.salarySV.reinitSalaryData().subscribe(_ => {
                    this.salary = PlanB;
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
        this.salarySV.getData(year, month).pipe(delay(2000)).subscribe(
            r => {
                let notData = false;
                if (!r) notData = true;     // 当月没有数据
                else {
                    if (r.hasError) notData = true;
                    else {
                        PlanA.date = this.salary.date;
                        this.salary = PlanA;
                        this.salarySV.languageProcessing(this.salary).subscribe();
                        this.salarySV.salaryDataProcessing(this.salary, r);
                    }
                }
                
                if (notData) {
                    if (!r.hasError) this.presentToast(Lang.Lang_711);
                    this.salarySV.reinitSalaryData().subscribe(_ => {
                        PlanB.date = this.salary.date;
                        // this.salary = PlanB;
                        this.salarySV.reinitPlanA().subscribe(_ => {
                            this.salary = PlanA;
                        });
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
     * @Description: 当前页面销毁后取消所有订阅
     */
    ngOnDestroy(): void {
        this.subscribers.forEach(r => {
            if (r) r.unsubscribe();
        });
    }
    
    stop($event) {
        $event.stopPropagation();
        $event.preventDefault();
        console.log("点击了");
        // $event.sto
        
    }
}
