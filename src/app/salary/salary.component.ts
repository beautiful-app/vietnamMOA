import {Component, OnInit} from '@angular/core';

export interface Section {
    name: string;
    updated: Date;
}

@Component({
    selector: 'app-salary',
    templateUrl: './salary.component.html',
    styleUrls: ['./salary.component.scss'],
})
export class SalaryComponent implements OnInit {
    activeKey = [1];
    accordions: Array<any> = [
        {title: 'Title 1', child: ['content 1', 'content 1', 'content 1']},
        {title: 'Title 2', child: ['content 2', 'content 2', 'content 2']},
        {title: 'Title 3', child: ['content 3', 'content 3', 'content 3']}
    ];
    
    
    folders: Section[] = [
        {
            name: 'Photos',
            updated: new Date('1/1/16'),
        },
        {
            name: 'Recipes',
            updated: new Date('1/17/16'),
        },
        {
            name: 'Work',
            updated: new Date('1/28/16'),
        }
    ];
    notes: Section[] = [
        {
            name: 'Vacation Itinerary',
            updated: new Date('2/20/16'),
        },
        {
            name: 'Kitchen Remodel',
            updated: new Date('1/18/16'),
        }
    ];
    
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    onChange(event) {
        console.log(event);
    }
}
