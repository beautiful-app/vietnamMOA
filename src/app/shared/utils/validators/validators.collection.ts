import {Validators} from '@angular/forms';
import {twoValueMatch} from './password-match';
import {APP} from '../../../core/singleton.export';

export const VALIDATORS = {
    case0: ['', Validators.compose([Validators.required])],
    case1: ['', Validators.compose([Validators.required, Validators.minLength(APP.authCodeLength)])],
    
    // 密码验证器
    case2: ['', Validators.compose([Validators.required, Validators.minLength(APP.minPasswordLength)])],
    case3: ['', Validators.compose([Validators.pattern(
        `^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{${APP.minPasswordLength},}$`)])],
    case4: ['', Validators.compose([Validators.required, Validators.maxLength(APP.minPhoneNum), Validators.minLength(APP.maxPhoneNum)])],
    // 匹配越南等地手机位数
    case5: ['', Validators.compose([Validators.required, Validators.pattern(`\\d{${APP.minPhoneNum},${APP.maxPhoneNum}}`)])],
    case6: ['', Validators.compose([Validators.minLength(4)])],
};

export const TwoPasswordValidator = {
    password: VALIDATORS.case0,
    confirmPassword: VALIDATORS.case3
};

export const TwoPasswordMatchValidator = {
    validator: twoValueMatch('password', 'confirmPassword')
};
