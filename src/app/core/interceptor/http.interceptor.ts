import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {USER} from '../../shared/entity/user.bo';

@Injectable({providedIn: 'root'})
export class HttpInterceptor implements HttpInterceptor {
    constructor(
        // @Inject('API_URL') private apiUrl: string
        //         // public errorDialogService: ErrorDialogService
    ) {
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        
        // const token: string = sessionStorage.getItem('token');
        // if(token) {
        req = req.clone({headers: req.headers.set('Authorization', USER.get().token)});
        // }
        // console.log('id是:' + USER.get().id);
        
        // if(!req.headers.has('Content-Type')) {
        // req = req.clone({headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')});
        console.log(req.urlWithParams);
        // if(req.url.indexOf('user/version/mlist') != -1)
        //     req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
        
        // }
        //
        // req = req.clone({headers: req.headers.set('Accept', 'application/json'), url: `${this.apiUrl}/${req.url}`});
        console.log(USER.get());
        console.log('进来拦截器');
        return next.handle(req);
        
        
    }
    
}
