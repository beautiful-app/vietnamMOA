import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {WHERE} from '../entity/where.enum';

@Injectable({providedIn: 'root'})
export class RouterService {
    constructor(
        private router: Router
    ) {
    }
    
    to(where: any, data?: any) {
        switch (where) {
            case WHERE.login:
                this.router.navigate(['/user/login']);
        }
        // this.router.navigate(['/']);
    }
}
