import {Injectable} from '@angular/core';
import {Httpbase} from './httpbase';
import {Incomes, ShowModeA, ShowModeB, Salary} from '../entity/salary.vo';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {URL} from '../const/url.const';
import {NEXT} from '../utils/next.util';

@Injectable({
    providedIn: 'root'
})
/**
 *  薪资处理相关服务类
 */
export class SalaryService extends Httpbase {
    constructor(
        private translate: TranslateService,
        private http: HttpClient
    ) {
        super(http);
    }
    
    /**
     * 请求服务端获取薪资数据
     * @param: {year} 年份
     * @param: {month} 月份
     * @return: Observable<any>
     */
    getData(year: string, month: string): Observable<any> {
        return new Observable<any>(o => {
            this.get(URL.get_salary_info, year, month).subscribe(r => {
                NEXT.dataOrError(o, r);
            });
        });
    }
    
    /**
     *  从缓存中获取薪资数据
     */
    getDataFromStorage(): Observable<Salary> {
        return new Observable<Salary>(o => {
            // todo 缓存薪资的需求暂时没有
            o.next();
            o.complete();
        });
    }
    
    /**
     *  薪资展示面板中的显示文字根据系统当前语言进行赋值
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
                    NEXT.finish(o);
                });
            } else NEXT.finish(o);
        });
    }
    
    /**
     *  对薪资实体对象进行语言常量的赋值替换
     * @param: {incomes} 薪资收入对象
     * @param: {nameArray} 翻译后的所有信息数组
     * @return: void
     */
    setName(incomes: Incomes[], nameArray: string[]): void {
        incomes.forEach(r => {
            r.identify = nameArray[r.id];
            if (r.items) r.items.forEach(rr => {
                rr.identify = nameArray[rr.id];
                if (rr.items) rr.items.forEach(rrr => {
                    rrr.identify = nameArray[rrr.id];
                });
            });
            
            if (r.itemsElse) r.itemsElse.forEach(rr => {
                rr.identify = nameArray[rr.id];
            })
        });
    }
    
    /**
     * 把薪资对象所有需要翻译的名称放到一个数组中
     * @param:  {incomes} 薪资收入对象
     * @return:  string[]
     */
    getNameIdArray(incomes: Incomes[]): string[] {
        let nameArray = [];
        incomes.forEach(r => {
            nameArray.push(r.id);
            if (r.items) r.items.forEach(rr => {
                nameArray.push(rr.id);
                if (rr.items) rr.items.forEach(rrr => {
                    nameArray.push(rrr.id);
                });
            });
            if (r.itemsElse) r.itemsElse.forEach(rr => {
                nameArray.push(rr.id);
            })
        });
        return nameArray;
    }
    
    /**
     *  根据后端返回的数据进行赋值到薪资对象中
     * @param:  {salary} 薪资对象
     * @param: {data} 服务端返回的数据对象
     * @return: void
     */
    salaryDataProcessing(salary: Salary, data: any) {
        salary.totalIncoming = data.node[0].salary;
        const dataArr = data.node[0].childs;
        
        salary.incomes.forEach((r, i) => {
            const rData = dataArr[i];
            const rArr = rData.childs;
            r.income = rData.salary;
            r.amount = rData.workHour;
            r.items.forEach((rr, j) => {
                const rrArr = rArr[j].childs;
                rr.income = rArr[j].salary;
                rr.amount = rArr[j].workHour;
                if (rr.items) rr.items.forEach((rrr, k) => {
                    rrr.income = rrArr[k].salary;
                    rrr.amount = rrArr[k].workHour;
                });
            });
        });
    }
    
    /**
     *  翻译ShowModeB
     * @return: Observable<Salary>
     */
    initShowModeB(): Observable<Salary> {
        return new Observable(o => {
            if (ShowModeB.hasTranslated) o.next();
            this.languageProcessing(ShowModeB).subscribe(r => {
                NEXT.finish(o);
            });
        });
    }
    
    /**
     *  如果本月无薪资信息,那么让薪资面板显示切回无数据的显示方式
     * @return: Observable<Salary>
     */
    reinitPlanA(): Observable<Salary> {
        return new Observable(o => {
            if (ShowModeA.hasTranslated) o.next();
            this.languageProcessing(ShowModeA).subscribe(r => {
                o.next();
            });
        });
    }
}
