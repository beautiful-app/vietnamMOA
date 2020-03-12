import {userInfoUpddate} from '../../core/ngrx/actions/user.actions';

export class USER {
    private _id: string = '';
    private _token: string = '';
    private _avatar: string = '';
    private _birthday: string = '';
    private _cellphone: string = '';
    private _department: string = '';
    private _deptId: string = '';
    private _email: string = '';
    private _gender: string = '';
    private _jobTitle: string = '';
    private _photo: string = '';
    private _pinyinName: string = '';
    private _role: string = '';
    private _state: number = -1;
    private _username: string = '';
    private _workAddress: string = '';
    
    
    // 类加载时，实例的创建
    private static _instance: USER = new USER();
    
    static get(): USER {
        return this._instance;
    }
    
    public static assign(info: USER, store, fromStorage?: boolean): USER {
        for (let propertyName in USER.get()) {
            let infoName;
            if(!fromStorage) infoName = propertyName.substr(1, propertyName.length);
            else infoName = propertyName;
            if(info[infoName]) USER.get()[propertyName] = info[infoName];
            if(propertyName == '_token' && info['access_token']) USER.get().token = info['access_token'];
        }
        store.dispatch(userInfoUpddate());
        return this._instance;
    }
    
    public static reset(store) {
        this._instance = new USER();
        store.dispatch(userInfoUpddate());
    }
    
    private constructor() {
    }
    
    get id(): string {
        return this._id;
    }
    
    set id(value: string) {
        console.log('设置了id');
        this._id = value;
    }
    
    get token(): string {
        return this._token;
    }
    
    set token(value: string) {
        this._token = value;
        // this._token = 'kdjfkdjfj';
        console.log('设置了token');
        // this.token = 'dkjfkjd';
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
}
