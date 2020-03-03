import {environment} from './environment';

class app {
    
    private _baseURL = environment.baseURL;
    private _succeedCode = 0;                                           // 后端成功标志代码
    private _language: 'en' | 'zh' | 'vi' = 'en';                    // 用户的系统语言在本软件中不支持下的默认语言
    private _pageSize = 15;
    private _versonFeaturesPZ = this._pageSize;                          // 功能介绍页面一次拉去的数据条数
    
    // code :1 错误信息
    // code :7 登录信息失效
    
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
    
    get versonFeaturesPZ(): number {
        return this._versonFeaturesPZ;
    }
    
    get language(): string {
        return this._language;
    }
}

export const APP = new app();

