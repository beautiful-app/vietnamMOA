import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {TestBed, async} from '@angular/core/testing';

import {Tabs} from './tabs';

describe('Tabs', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Tabs],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));
    
    it('should create the tabs page', () => {
        const fixture = TestBed.createComponent(Tabs);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
