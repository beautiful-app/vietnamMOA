import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {WHERE} from '../entity/where.enum';
import {Location} from '@angular/common';
import {filter} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RouterService {
    
    private _previousUrl: string;
    private _currentUrl: string;
    private _routeHistory: string[];
    
    constructor(
        private router: Router,
        private location: Location
    ) {
        this._routeHistory = [];
        router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
            console.log('event:', event);
            this._setURLs(event);
            console.log('路由变换:', this.previousUrl, this.currentUrl, this.routeHistory);
            this.canBack();
        });
    }
    
    to(where: any, data?: any) {
        switch (where) {
            case WHERE.login:
                console.log('进来了');
                this.router.navigate(['/user/login']);
                break;
            case WHERE.back:
                if(this.previousUrl) {
                    this.router.navigate([this.previousUrl]);
                } else this.to(WHERE.home);
                break;
            case WHERE.home:
                this.router.navigate(['/tabs/salary']);
                break;
        }
    }
    
    
    private _setURLs(event: NavigationEnd): void {
        const tempUrl = this._currentUrl;
        this._previousUrl = tempUrl;
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
    
    // 是否可返回
    canBack(): boolean {
        if(this.currentUrl.indexOf('/tabs') != -1) {
            this.router.navigate([this.previousUrl]);
            return false;
        } else return true;
    }
    
    isTabsPage() {
    
    }
}
