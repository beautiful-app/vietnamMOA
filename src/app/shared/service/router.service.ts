import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {filter} from 'rxjs/operators';
import {StringUtil} from '../utils/string.util';
import {TWBase} from '../TWBase.ui';
import {NavController} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ROUTE} from '../const/route.enum';

@Injectable({providedIn: 'root'})
/**
 *  路由与导航服务类
 */
export class RouterService extends TWBase {
    
    private _previousUrl: string;            // 相对于当前页的前一个页面
    private _currentUrl: string;             // 当前页面
    private _routeHistory: string[] = [];    // 路由路径数组
    private _backTimeOut: boolean = true;    // 用户物理返回的延时开关，修复点击按钮同时快速物理返回会出现空白页面的bug
    constructor(
        private router: Router,
        private location: Location,
        private navCtrl: NavController,
        private statusBar: StatusBar
    ) {
        super();
    }
    
    /**
     *  路由跳转方法
     * @param: {where} 导航到哪里
     * @param: {data} 携带的数据
     * @return: void
     */
    to(where: any, data?: any) {
        this.router.navigate([where]);
    }
    
    /**
     *  跳转到登录页面
     */
    toLogin() {
        this.to(ROUTE.login);
    }
    
    /**
     *  路由检查方法，记录用户的每一步路由，并把相应信息记录，方便做前后跳转等导航操作
     */
    routeDetection() {
        this._routeHistory = [];
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this._setURLs(event);
                // 当前登录页的
                if (StringUtil.isInclude(this._currentUrl, ROUTE.login)) {
                    this.statusBar.overlaysWebView(true);
                } else if (StringUtil.isIncludeArr([[this._currentUrl, ROUTE.tabs_home], [this._currentUrl, ROUTE.reset_password]])) {
                    this.statusBar.overlaysWebView(false);
                    setTimeout(_ => {
                        this.statusBar.backgroundColorByHexString('#3dc2ff');
                    }, 100);
                }
            });
    }
    
    /**
     *  根据路由事件对象 event维护自己配置的历史路由
     */
    private _setURLs(event: NavigationEnd): void {
        // 如果堆栈的历史大于零在做处理
        let url = event.urlAfterRedirects;
        if (!StringUtil.isIncludeArr([[url, ROUTE.tabs_root], [url, ROUTE.login]])) {
            if (url == this._previousUrl) {
                this._routeHistory.pop();
            } else {
                this._routeHistory.push(url);
            }
        } else this._routeHistory = [url];
        if (this._routeHistory.length > 0) {
            this._currentUrl = this._routeHistory[this._routeHistory.length - 1];
            this._previousUrl = this._routeHistory.length > 1 ? this._routeHistory[this._routeHistory.length - 2] : this._currentUrl;
        }
        
    }
    
    /**
     * 是否可返回，可返回就做返回处理
     * @return boolean
     */
    back(): boolean {
        if (!StringUtil.isIncludeArr([[this._currentUrl, ROUTE.tabs_root], [this._currentUrl, ROUTE.login]])) {
            if (this._backTimeOut) {
                this._backTimeOut = false;
                if (this._previousUrl == this.router.url) return true;
                if (this._previousUrl) {
                    // 获取当前的url，判断如果当前url和previousUrl一样那就不做任何事情
                    this.navCtrl.navigateBack(this._previousUrl);
                } else {
                    this.to(ROUTE.tabs_home);
                }
                setTimeout(_ => {
                    this._backTimeOut = true;
                }, 400);
            }
            return true;
        } else return false;
    }
}
