import {Injectable} from '@angular/core';
import {Httpbase} from './httpbase';
import {Incomes, PlanB, Salary} from '../entity/salary.vo';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {URL} from '../const/url.const';
import {RETURN} from '../utils/return-verify.util';
import {salaryReturnFieldMatch} from '../const/salary-field-match.enum';

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
            // 根据语言进行字段
            // o.next(PlanA);
            o.next();
        });
    }
    
    languageProcessing(salary: Salary): Observable<Salary> {
        return new Observable<Salary>(o => {
            this.translate.getLangs();
            let nameArray = this.getNameIdArray(salary.incomes);
            this.translate.get(nameArray).subscribe(r => {
                let setNameResult = this.setName(salary.incomes, r);
                o.next();
            });
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
    
    // reinitSalaryData(salary: Salary) {
    //     salary = PlanB;
    //     // let initNum = '0.00';
    //     // salary.totalIncoming = initNum;
    //     // salary.incomes.forEach(r => {
    //     //     r.income = initNum;
    //     //     r.items.forEach(rr => {
    //     //         rr.income = initNum;
    //     //     });
    //     // });
    // }
}
