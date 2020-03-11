import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {WHERE} from '../entity/where.enum';
import {Location} from '@angular/common';
import {filter, last} from 'rxjs/operators';
import {StringUtil} from '../utils/string.util';
import {TWBase} from '../TWBase.ui';
import {NavController} from '@ionic/angular';
import {route} from '../const/route.enum';

@Injectable({providedIn: 'root'})
export class RouterService extends TWBase {
    
    private _previousUrl: string;
    private _currentUrl: string;
    private _routeHistory: string[] = [];
    
    constructor(
        private router: Router,
        private location: Location,
        private navCtrl: NavController
    ) {
        super();
        this._routeHistory = [];
        router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
            this._setURLs(event);
            console.log('路由变换:', this.previousUrl, this.currentUrl, this.routeHistory);
            // this.canBack();
            console.log('kkk', StringUtil.isIncludeArr([[event.urlAfterRedirects, route.tabs_root], [event.urlAfterRedirects, route.login]]));
        });
    }
    
    to(where: any, data?: any) {
        switch (where) {
            case WHERE.login:
                this.router.navigate([route.login]);
                break;
            case WHERE.back:
                if(this.previousUrl) {
                    this.navCtrl.back();
                } else this.to(WHERE.home);
                break;
            case WHERE.home:
                this.router.navigate([route.tabs_home]);
                break;
        }
    }
    
    
    private _setURLs(event: NavigationEnd): void {
        // 如果堆栈的历史大于零在做处理
        this._previousUrl = this._currentUrl;
        this._currentUrl = event.urlAfterRedirects;
        this._routeHistory.push(event.urlAfterRedirects);
    }
    
    get previousUrl(): string {
        return this._previousUrl;
    }
    
    get currentUrl(): string {
        return this._currentUrl;
    }
    
    get routeHistory(): string[] {
        return this._routeHistory;
    }
    
    
    set routeHistory(value: string[]) {
        this._routeHistory = value;
    }

// 是否可返回
    back(): boolean {
        // let currentUrl = this.routeHistory[this.routeHistory.length - 1];
        if(!StringUtil.isIncludeArr([[this.currentUrl, route.tabs_root], [this.currentUrl, route.login]])) {
            this.navCtrl.back();
            return true;
        } else return false;
    }
    
}
