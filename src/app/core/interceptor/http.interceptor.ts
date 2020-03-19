import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {USER} from '../../shared/entity/user.bo';
import {catchError, map} from 'rxjs/operators';
import {RouterService} from '../../shared/service/router.service';
import {WHERE} from '../../shared/entity/where.enum';
import {UserService} from '../../shared/service/user.service';

@Injectable({providedIn: 'root'})
export class HttpInterceptor implements HttpInterceptor {
    constructor(
        // @Inject('API_URL') private apiUrl: string
        //         // public errorDialogService: ErrorDialogService
        private routerSV: RouterService,
        private userSV: UserService
    ) {
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // const token: string = sessionStorage.getItem('token');
        // if(token) {
        // console.log('进来拦截器，此时用户token为:', USER.get().token, req.urlWithParams);
        
        req = req.clone({headers: req.headers.set('Authorization', USER.get().token)});
        // }
        // console.log('id是:' + USER.get().id);
        
        // if(!req.headers.has('Content-Type')) {
        // req = req.clone({headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')});
        // if(req.url.indexOf('user/version/mlist') != -1)
        //     req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
        
        // TODO 如果在登陆页，而且不是登录请求，或者本地语言等静态资源请求，那么禁止所有http
        
        // }
        //
        // req = req.clone({headers: req.headers.set('Accept', 'application/json'), url: `${this.apiUrl}/${req.url}`});
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if(event instanceof HttpResponse) {
                    if(event.body.code && event.body.code == 7) {
                        // 访问过期了就导航到登录页
                        this.userSV.loginOut();
                    }
                }
                return event;
            }));
    }
    
}
