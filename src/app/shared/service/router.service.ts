import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {WHERE} from '../entity/where.enum';
import {Location} from '@angular/common';
import {filter} from 'rxjs/operators';
import {StringUtil} from '../utils/string.util';
import {TWBase} from '../TWBase.ui';
import {NavController} from '@ionic/angular';
import {route} from '../const/route.enum';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Injectable({providedIn: 'root'})
export class RouterService extends TWBase {
    
    private _previousUrl: string;
    private _currentUrl: string;
    private _routeHistory: string[] = [];
    
    constructor(
        private router: Router,
        private location: Location,
        private navCtrl: NavController,
        private statusBar: StatusBar
    ) {
        super();
    }
    
    
    to(where: any, data?: any) {
        switch (where) {
            case WHERE.login:
                this.router.navigate([route.login]);
                break;
            case WHERE.back:
                if(this._previousUrl) {
                    this.navCtrl.back();
                } else this.to(WHERE.home);
                break;
            case WHERE.home:
                this.router.navigate([route.tabs_home]);
                break;
        }
    }
    
    routeDetection() {
        this._routeHistory = [];
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
            this._setURLs(event);
            // 当前登录页的
            if(StringUtil.isInclude(this._currentUrl, route.login)) {
                this.statusBar.overlaysWebView(true);
            } else if(StringUtil.isIncludeArr([[this._currentUrl, route.tabs_home], [this._currentUrl, route.reset_password]])) {
                this.statusBar.overlaysWebView(false);
                setTimeout(_ => {
                    this.statusBar.backgroundColorByHexString('#3dc2ff');
                }, 100);
            }
            console.log('路由变换:', this._previousUrl, this._currentUrl, this._routeHistory);
        });
    }
    
    private _setURLs(event: NavigationEnd): void {
        // 如果堆栈的历史大于零在做处理
        let url = event.urlAfterRedirects;
        if(!StringUtil.isIncludeArr([[url, route.tabs_root], [url, route.login]])) {
            if(url == this._previousUrl) {
                this._routeHistory.pop();
            } else {
                this._routeHistory.push(url);
            }
        } else this._routeHistory = [url];
        this._currentUrl = this._routeHistory[this._routeHistory.length - 1];
        this._previousUrl = this._routeHistory[this._routeHistory.length - 2];
    }
    
    // 是否可返回
    back(): boolean {
        if(!StringUtil.isIncludeArr([[this._currentUrl, route.tabs_root], [this._currentUrl, route.login]])) {
            this.navCtrl.navigateBack(this._previousUrl);
            return true;
        } else return false;
    }
    
    
}
