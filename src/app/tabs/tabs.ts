import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';

@Component({
    templateUrl: 'tabs.html',
    styleUrls: ['tabs.scss']
})
export class Tabs {
    newMark: boolean = false;
    
    constructor(
        private store: Store<{ userInfoUpddate: 'user', newVersion: 'newVersion' }>,
    ) {
        
        this.store.pipe(select('newVersion')).subscribe(r => {
            this.newMark = Boolean(r);
        });
        
    }
    
    
}
