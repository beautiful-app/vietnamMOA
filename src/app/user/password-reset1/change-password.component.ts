import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {twoValueMatch} from '../../shared/utils/validators/password-match';
import {UserService} from '../../shared/service/user.service';
import {RETURN} from '../../shared/utils/return-verify.util';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
    form: FormGroup;
    
    constructor(
        private formBuilder: FormBuilder,
        private userSV: UserService
    ) {
    }
    
    ngOnInit() {
        this.form = this.formBuilder.group({
            oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        }, {
            validator: twoValueMatch('password', 'confirmPassword', '两次输入的新密码不相等!')
        });
    }
    
    commitChanges() {
        this.userSV.changePassword(this.form.getRawValue()).subscribe(r => {
            if(RETURN.isTrue(r)) console.log('路由跳转');
            else console.log('显示错误信息', r);
        });
    }
}
