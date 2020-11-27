import {userInfoUpddate, userLogOut} from '../../core/ngrx/actions/user.actions';

/**
 * 用户对象实体类
 */
export class USER {
    private _id: string = '';               // 工号
    private _token: string = '';            // token信息
    private _avatar: string = '';           // 头像
    private _birthday: string = '';         // 生日
    private _cellphone: string = '';        // 电话
    private _department: string = '';       // 部门名称
    private _deptId: string = '';           // 部门id
    private _email: string = '';            // 邮件
    private _gender: string = '';           // 性别
    private _jobTitle: string = '';         // 职称
    private _photo: string = '';            // 头像地址
    private _pinyinName: string = '';       // 中文名
    private _role: string = '';             // 角色
    private _state: number = -1;            // 状态
    private _username: string = '';         // 用户名
    private _workAddress: string = '';      // 工作地址
    private _isActive: boolean = false;     // 对象是否已经激活并且可用
    
    
    // 饿汉模式实例化user对象
    private static _instance: USER = new USER();
    
    static get(): USER {
        return this._instance;
    }
    
    public static assign(info: USER, store, fromStorage?: boolean, newInfo?: boolean): USER {
        for (let propertyName in USER.get()) {
            let infoName;
            if(!fromStorage) infoName = propertyName.substr(1, propertyName.length);
            else infoName = propertyName;
            if(info[infoName]) USER.get()[propertyName] = info[infoName];
            if(propertyName == '_token' && info['access_token']) USER.get().token = info['access_token'];
        }
        // 如果重新获取了用户信息，那么设置标识为真
        if(newInfo) {
            USER.get().isActive = true;
            store.dispatch(userInfoUpddate());
            store.dispatch(userLogOut({hasLogout: false}));
        }
        return this._instance;
    }
    
    public static reset(store) {
        this._instance = new USER();
        store.dispatch(userLogOut({hasLogout: true}));
    }
    
    private constructor() {
    }
    
    get id(): string {
        return this._id;
    }
    
    set id(value: string) {
        this._id = value;
    }
    
    get token(): string {
        return this._token;
    }
    
    set token(value: string) {
        this._token = value;
    }
    
    get avatar(): string {
        return this._avatar;
    }
    
    set avatar(value: string) {
        this._avatar = value;
    }
    
    get birthday(): string {
        return this._birthday;
    }
    
    get cellphone(): string {
        return this._cellphone;
    }
    
    get department(): string {
        return this._department;
    }
    
    get deptId(): string {
        return this._deptId;
    }
    
    get email(): string {
        return this._email;
    }
    
    get gender(): string {
        return this._gender;
    }
    
    get jobTitle(): string {
        return this._jobTitle;
    }
    
    get photo(): string {
        return this._photo;
    }
    
    get pinyinName(): string {
        return this._pinyinName;
    }
    
    get role(): string {
        return this._role;
    }
    
    get state(): number {
        return this._state;
    }
    
    get username(): string {
        return this._username;
    }
    
    get workAddress(): string {
        return this._workAddress;
    }
    
    
    get isActive(): boolean {
        return this._isActive;
    }
    
    set isActive(value: boolean) {
        this._isActive = value;
    }
}
