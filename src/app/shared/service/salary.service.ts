import {Injectable} from '@angular/core';
import {Httpbase} from './httpbase';
import {Incomes, PlanA, PlanB, Salary} from '../entity/salary.vo';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class SalaryService {
    constructor(
        private translate: TranslateService,
    ) {
    
    }
    
    getData(year: string, month: string): Observable<Salary> {
        return;
    }
    
    getDataFromStorage(): Observable<Salary> {
        return new Observable<Salary>(o => {
            // 根据语言进行字段
            // o.next(PlanA);
            o.next(PlanB);
        });
    }
    
    languageProcessing(salary: Salary): Observable<Salary> {
        return new Observable<Salary>(o => {
            this.translate.getLangs();
            let nameArray = this.getNameArray(salary.incomes);
            this.translate.get(nameArray).subscribe(r => {
                let setNameResult = this.setName(salary.incomes, r);
                console.log('set result', salary.incomes);
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
    
    getNameArray(incomes: Incomes[]): any[] {
        let nameArray = [];
        incomes.forEach(r => {
            // console.log(r.name);
            nameArray.push(r.name);
            if(r.items) r.items.forEach(rr => {
                nameArray.push(rr.name);
                // console.log(rr.name);
            });
        });
        return nameArray;
    }
    
}
