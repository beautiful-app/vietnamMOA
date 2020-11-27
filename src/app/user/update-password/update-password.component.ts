import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../shared/service/user.service';
import {
    TwoPasswordMatchValidator,
    TwoPasswordValidator,
    VALIDATORS
} from '../../shared/utils/validators/validators.collection';
import {TWBase} from '../../shared/TWBase.ui';
import {Lang} from '../../shared/const/language.const';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent extends TWBase implements OnInit {
    
    oldPasswordHide: boolean = true;    // 旧密码隐藏开关
    passwordHide: boolean = true;       // 新密码隐藏开关
    form: FormGroup;                    // form对象
    updating: boolean = false;          // true为在修改密码中
    
    constructor(
        private formBuilder: FormBuilder,
        private userSV: UserService,
    ) {
        super();
    }
    
    ngOnInit() {
        let validator = {...TwoPasswordValidator};
        validator['oldPassword'] = VALIDATORS.case0;
        this.form = this.formBuilder.group(validator, TwoPasswordMatchValidator);
    }
    
    /**
     * 请求更新密码
     */
    commitChanges() {
        if (!this.updating) {
            this.updating = true;
            this.userSV.changePassword(this.form.getRawValue()).pipe(delay(2000)).subscribe(r => {
                    // 密码修改成功
                    if (!r) {
                        this.presentToast(Lang.Lang_73, null, 1500);
                        setTimeout(_ => {
                            this.userSV.loginOut();
                        }, 1500);
                    } else {
                        // 新旧密码相同
                        if (Number(r.code) == 1) this.presentToast(Lang.Lang_86);
                        // 原密码错误
                        else if (Number(r.code) == 100105) this.presentToast(Lang.Lang_712);
                        else this.presentToast(String(r.msg));
                    }
                }, null,
                () => this.updating = false);
        }
    }
}
