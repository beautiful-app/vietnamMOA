import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
    
    @ViewChild('datePicker', {static: false}) datePicker: any;
    
    ngOnInit() {
    
    }
    
    ngAfterViewInit() {
        console.log('datepicker', this.datePicker);
        // this.datePicker.open();
    }
    
    customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
    customDayShortNames = [2020, 2016, 2008];
    customPickerOptions: any;
    date: any;
    daete1 = new Date();
    
    constructor() {
        let _this = this;
        this.customPickerOptions = {
            buttons: [
                {
                    text: '取消',
                    handler: ($event) => {
                        console.log($event);
                        return false;
                    }
                },
                {
                    text: '确定',
                    handler: ($event) => {
                        _this.daete1 = $event;
                        console.log(_this.daete1);
                    }
                },
            ]
        };
    }
    
    
    dateChange($event) {
    
    }
}

