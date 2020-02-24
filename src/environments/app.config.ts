import {environment} from './environment';

class app {
    
    private _baseURL = environment.baseURL;
    private _succeedCode = 0;
    private _versonFeaturesListNumber = 15;     // 功能介绍页面一次拉去的数据条数
    private _language: 'en' | 'zh' | 'vi' = 'en';                    // 用户的系统语言在本软件中不支持下的默认语言
    
    constructor() {
    }
    
    public fullURL(suffix: string): string {
        return this._baseURL + suffix;
    }
    
    get baseURL(): string {
        return this._baseURL;
    }
    
    get succeedCode(): number {
        return this._succeedCode;
    }
    
    get versonFeaturesListNumber(): number {
        return this._versonFeaturesListNumber;
    }
    
    get language(): string {
        return this._language;
    }
}

export const APP = new app();

