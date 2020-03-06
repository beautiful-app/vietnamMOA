import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {datePicker, DatePickerOptions} from '../shared/entity/date-picker-options.vo';
import {PlanA, Salary} from '../shared/entity/salary.vo';
import {DateUtil} from '../shared/utils/date.util';
import {SalaryService} from '../shared/service/salary.service';


@Component({
    selector: 'app-salary',
    templateUrl: './salary.component.html',
    styleUrls: ['./salary.component.scss'],
})
export class SalaryComponent implements OnInit, AfterViewInit {
    @ViewChild('datePicker', {static: false}) datePicker: any;
    
    panelOpenState = false;
    private customPickerOptions: DatePickerOptions = datePicker.options(this);
    private salary: Salary;
    private date: string = DateUtil.getYearMonth();
    
    constructor(private salsrySV: SalaryService) {
        // 从缓存中获取已保存的数据
        this.salsrySV.getDataFromStorage().subscribe(r => {
            this.salary = r;
            // 根据语言环境进行数据处理
            this.salsrySV.languageProcessing(r).subscribe(r => {
            
            });
            // 通过http请求判断当月有没有新的工资数据
            this.salsrySV.getData(DateUtil.getFullYear(), DateUtil.getYearMonth());
        });
        
    }
    
    dateHandle(pick) {
        // 判断前后日期是否有变化
        let year = pick.year.text;
        let month = pick.month.text;
        let pickerDate = year + '/' + month;
        // 重新获取数据
        if(this.date != pickerDate) {
            this.date = pickerDate;
            this.salsrySV.getData(year, month);
        }
        this.date = pickerDate;
    }
    
    
    ngOnInit(): void {
    }
    
    openDatePicker(): void {
        this.datePicker.open();
    }
    
    ngAfterViewInit(): void {
        // this.datePicker.open();
    }
    
}
