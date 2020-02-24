import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {USER} from '../entity/user.bo';


@Injectable()
export class UserResolve implements Resolve<any> {
    constructor(private router: Router,
                private userSV: UserService
    ) {
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        console.log('预加载生效', USER.get());
        return new Observable<any>(o => {
            // return this.userSV.getUserFromStorage();
            // .subscribe(r => {
            //     if(r) {
            //         // return true;
            //         return null;
            //         // o.next();
            //     } else {
            //         this.router.navigate(['user/details']);
            //     }
            // });
            o.next('kdfk');
            // return true;
        });
    }
}
