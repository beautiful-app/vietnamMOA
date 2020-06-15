import {Injectable} from '@angular/core';
import {Httpbase} from './httpbase';
import {Incomes, PlanA, PlanB, Salary} from '../entity/salary.vo';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {URL} from '../const/url.const';
import {RETURN} from '../utils/return-verify.util';

@Injectable({
    providedIn: 'root'
})
/**
 * @Description: 薪资处理相关服务类
 */
export class SalaryService extends Httpbase {
    constructor(
        private translate: TranslateService,
        private http: HttpClient
    ) {
        super(http);
    }
    
    /**
     * @Description: 请求服务端获取薪资数据
     * @param: {year} 年份
     * @param: {month} 月份
     * @return: Observable<any>
     */
    getData(year: string, month: string): Observable<any> {
        return new Observable<any>(o => {
            this.get(URL.get_salary_info, year, month).subscribe(r => {
                RETURN.nextDataAndError(o, r);
            });
        });
    }
    
    /**
     * @Description: 从缓存中获取薪资数据
     */
    getDataFromStorage(): Observable<Salary> {
        return new Observable<Salary>(o => {
            // todo 缓存薪资的需求暂时没有
            o.next();
            o.complete();
        });
    }
    
    /**
     * @Description: 薪资展示面板中的语言根据系统当前语言进行设置
     * @param:  {salary} 薪资实体对象
     * @return:  Observable<Salary>
     */
    languageProcessing(salary: Salary): Observable<Salary> {
        return new Observable<Salary>(o => {
            // 如果还没有翻译过
            if (!salary.hasTranslated) {
                let nameArray = this.getNameIdArray(salary.incomes);
                this.translate.get(nameArray).subscribe(r => {
                    this.setName(salary.incomes, r);
                    salary.hasTranslated = true;
                    o.next();
                });
            }
        });
    }
    
    /**
     * @Description: 对薪资实体对象进行语言常量的赋值替换
     * @param: {incomes} 薪资收入对象
     * @param: {nameArray} 翻译后的所有信息数组
     * @return: void
     */
    setName(incomes: Incomes[], nameArray: string[]): void {
        incomes.forEach(r => {
            r.name = nameArray[r.name];
            if (r.items) r.items.forEach(rr => {
                rr.name = nameArray[rr.name];
                if (rr.items) rr.items.forEach(rrr => {
                    rrr.name = nameArray[rrr.name];
                });
            });
        });
    }
    
    /**
     * @Description: 把薪资对象所有需要翻译的名称放到一个数组中
     * @param:  {incomes} 薪资收入对象
     * @return:  string[]
     */
    getNameIdArray(incomes: Incomes[]): string[] {
        let nameArray = [];
        incomes.forEach(r => {
            nameArray.push(r.name);
            if (r.items) r.items.forEach(rr => {
                nameArray.push(rr.name);
                if (rr.items) rr.items.forEach(rrr => {
                    nameArray.push(rrr.name);
                });
            });
        });
        return nameArray;
    }
    
    /**
     * @Description: 根据后端返回的数据进行整理操作，使之符合两层结构
     * @param:  {salary} 薪资对象
     * @param: {data} 服务端返回的数据对象
     * @return: void
     */
    salaryDataProcessing(salary: Salary, data: any) {
        salary.totalIncoming = data.salary;
        salary.incomes.forEach(r => {
            r.income = data.data[r.matchField];
            r.items.forEach(rr => {
                rr.income = data.data[rr.matchField];
            });
        });
    }
    
    /**
     * @Description: 如果本月无薪资信息,那么让薪资面板显示切回无数据的显示方式
     * @return: Observable<Salary>
     */
    reinitSalaryData(): Observable<Salary> {
        return new Observable(o => {
            if (PlanB.hasTranslated) o.next();
            this.languageProcessing(PlanB).subscribe(r => {
                o.next();
            });
        });
    }
    
    /**
     * @Description: 如果本月无薪资信息,那么让薪资面板显示切回无数据的显示方式
     * @return: Observable<Salary>
     */
    reinitPlanA(): Observable<Salary> {
        return new Observable(o => {
            if (PlanA.hasTranslated) o.next();
            this.languageProcessing(PlanA).subscribe(r => {
                o.next();
            });
        });
    }
    
}
