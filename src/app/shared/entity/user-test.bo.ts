export class USER_TEST {
    public _id: string = '';
    public _token: string = '';
    public _avatar: string = '';
    public _birthday: string = '';
    public _cellphone: string = '';
    public _department: string = '';
    public _deptId: string = '';
    public _email: string = '';
    public _gender: string = '';
    public _jobTitle: string = '';
    public _photo: string = '';
    public _pinyinName: string = '';
    public _role: string = '';
    public _state: number = -1;
    public _username: string = '';
    public _workAddress: string = '';
    
    constructor(model: any = {}) {
        this._avatar = this._token = model;
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
    
    
}
