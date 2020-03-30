import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {USER} from '../../shared/entity/user.bo';
import {catchError, delay, map, retry, timeout} from 'rxjs/operators';
import {RouterService} from '../../shared/service/router.service';
import {UserService} from '../../shared/service/user.service';
import {Network} from '@ionic-native/network/ngx';
import {TWBase} from '../../shared/TWBase.ui';

@Injectable({providedIn: 'root'})
export class HttpInterceptor extends TWBase implements HttpInterceptor {
    constructor(
        // @Inject('API_URL') private apiUrl: string
        //         // public errorDialogService: ErrorDialogService
        private routerSV: RouterService,
        private userSV: UserService,
        private network: Network
    ) {
        super();
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        req = req.clone({headers: req.headers.set('Authorization', USER.get().token)});
        const started = Date.now();
        return next.handle(req).pipe(
            // delay(10000),
            timeout(20000),
            map((event: HttpEvent<any>) => {
                if(event instanceof HttpResponse) {
                    if(event.body.code && event.body.code == 7) {
                        // 访问过期了就导航到登录页
                        this.userSV.loginOut();
                    }
                }
                return event;
            }),
            retry(1),
            catchError((error: HttpErrorResponse) => {
                console.log('connection', this.network.Connection);
                this.presentToast('请求失败，请检查网络并重新尝试');
                this.loadingDismissAll().pipe(delay(5500)).subscribe();
                return Observable.throw(new HttpErrorResponse({}));
            })
        );
    }
}
