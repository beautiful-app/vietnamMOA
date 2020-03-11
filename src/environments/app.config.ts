import {environment} from './environment';

export class app {
    
    private _baseURL = environment.baseURL;
    private _succeedCode = 0;                                           // 后端成功标志代码
    private _invalidationCode = 7;                              // 访问标识过期代码
    private _language: 'en' | 'zh' | 'vi' = 'en';                    // 用户的系统语言在本软件中不支持下的默认语言
    private _pageSize = 15;
    private _versonFeaturesPZ = this._pageSize;                          // 功能介绍页面一次拉去的数据条数
    private _minPasswordLength = 7;                         // 密码最小长度
    private _authCodeLength = 4;                    // 验证码最小长度
    
    // 手机号最大/小多少位，
    private _maxPhoneNum = 11;
    private _minPhoneNum = 11;
    
    private _appVersion = '9.5.3';               // 当无法使用cordova插件的时候，自定义一个版本号显示和测试
    
    
    // 定义两次点击在多少秒之内判定用户退出  单位：毫秒
    private _backButtonTime = 1500;
    // code :1 错误信息
    // code :7 登录信息失效
    
    // 路由信息
    
    
    constructor() {
    }
    
    public fullURL(suffix: string): string {
        return this._baseURL + suffix;
    }
    
    get baseURL(): string {
        return this._baseURL;
    }
    
    
    get invalidationCode(): number {
        return this._invalidationCode;
    }
    
    get backButtonTime(): number {
        return this._backButtonTime;
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
    
    get maxPhoneNum(): number {
        return this._maxPhoneNum;
    }
    
    get minPhoneNum(): number {
        return this._minPhoneNum;
    }
    
    get pageSize(): number {
        return this._pageSize;
    }
    
    
    get minPasswordLength(): number {
        return this._minPasswordLength;
    }
    
    get authCodeLength(): number {
        return this._authCodeLength;
    }
    
    get appVersion(): string {
        return this._appVersion;
    }
}


