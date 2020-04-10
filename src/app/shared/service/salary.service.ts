import {Injectable} from '@angular/core';
import {Httpbase} from './httpbase';
import {Incomes, PlanB, Salary} from '../entity/salary.vo';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {URL} from '../const/url.const';
import {RETURN} from '../utils/return-verify.util';

@Injectable({
    providedIn: 'root'
})
export class SalaryService extends Httpbase {
    constructor(
        private translate: TranslateService,
        private http: HttpClient
    ) {
        super(http);
    }
    
    getData(year: string, month: string): Observable<any> {
        return new Observable<any>(o => {
            this.get(URL.get_salary_info, year, month).subscribe(r => {
                RETURN.nextData(o, r);
            });
        });
    }
    
    getDataFromStorage(): Observable<Salary> {
        return new Observable<Salary>(o => {
            // todo 缓存薪资的需求暂时没有
            o.next();
            o.complete();
        });
    }
    
    languageProcessing(salary: Salary): Observable<Salary> {
        return new Observable<Salary>(o => {
            if(!salary.hasTranslated) {
                this.translate.getLangs();
                let nameArray = this.getNameIdArray(salary.incomes);
                this.translate.get(nameArray).subscribe(r => {
                    this.setName(salary.incomes, r);
                    salary.hasTranslated = true;
                    o.next();
                });
            }
        });
    }
    
    setName(incomes: Incomes[], nameArray: string[]): void {
        incomes.forEach(r => {
            r.name = nameArray[r.name];
            if(r.items) r.items.forEach(rr => {
                rr.name = nameArray[rr.name];
            });
        });
    }
    
    getNameIdArray(incomes: Incomes[]): any[] {
        let nameArray = [];
        incomes.forEach(r => {
            nameArray.push(r.name);
            if(r.items) r.items.forEach(rr => {
                nameArray.push(rr.name);
            });
        });
        return nameArray;
    }
    
    
    salaryDataProcessing(salary: Salary, data: any) {
        salary.totalIncoming = data.salary;
        salary.incomes.forEach(r => {
            r.income = data.data[r.matchField];
            r.items.forEach(rr => {
                rr.income = data.data[rr.matchField];
            });
        });
    }
    
    reinitSalaryData(): Observable<Salary> {
        return new Observable(o => {
            if(PlanB.hasTranslated) o.next();
            this.languageProcessing(PlanB).subscribe(r => {
                o.next();
            });
        });
    }
    
}
