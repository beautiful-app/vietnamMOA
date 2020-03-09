import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/service/user.service';
import {twoValueMatch} from '../../shared/utils/validators/password-match';
import {RETURN} from '../../shared/utils/return-verify.util';
import {TwoPasswordMatchValidator, TwoPasswordValidator, VALIDATORS} from '../../shared/utils/validators/validators.collection';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
    
    oldPasswordHide: boolean = true;
    passwordHide: boolean = true;
    form: FormGroup;
    
    constructor(
        private formBuilder: FormBuilder,
        private userSV: UserService
    ) {
    
    }
    
    ngOnInit() {
        let validator = {...TwoPasswordValidator};
        validator['oldPassword'] = VALIDATORS.case2;
        this.form = this.formBuilder.group(validator, TwoPasswordMatchValidator);
    }
    
    commitChanges() {
        this.userSV.changePassword(this.form.getRawValue()).subscribe(r => {
            if(RETURN.isTrue(r)) console.log('路由跳转');
            else console.log('显示错误信息', r);
        });
    }
    
}
