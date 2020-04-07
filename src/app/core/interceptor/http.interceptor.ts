import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {USER} from '../../shared/entity/user.bo';
import {catchError, delay, map, retry, timeout} from 'rxjs/operators';
import {RouterService} from '../../shared/service/router.service';
import {UserService} from '../../shared/service/user.service';
import {Network} from '@ionic-native/network/ngx';
import {TWBase} from '../../shared/TWBase.ui';
import {MatDialog} from '@angular/material';
import {PromptService} from '../../shared/service/prompt.service';

@Injectable({providedIn: 'root'})
export class HttpInterceptor extends TWBase {
    constructor(
        // @Inject('API_URL') private apiUrl: string
        //         // public errorDialogService: ErrorDialogService
        private routerSV: RouterService,
        private userSV: UserService,
        private network: Network,
        private dialog: MatDialog,
        private promptSV: PromptService
    ) {
        super();
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({headers: req.headers.set('Authorization', USER.get().token)});
        let errorRespone = new HttpResponse({status: 200, body: {hasError: true}});
        return next.handle(req).pipe(
            timeout(20000),
            map((event: HttpEvent<any>) => {
                if(event instanceof HttpResponse) {
                    if(event.body.code && event.body.code == 7) {
                        this.presentToast('访问已过期');
                        // 访问过期了就导航到登录页
                        setTimeout(_ => {
                            this.userSV.loginOut();
                        }, 1500);
                        return errorRespone;
                    } else return event;
                } else return event;
            }),
            retry(1),
            catchError((error: HttpErrorResponse) => {
                this.promptSV.networkErrorToast();
                return of(errorRespone);
            })
        );
    }
}
