import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/service/user.service';
import {twoValueMatch} from '../../shared/utils/validators/password-match';
import {RETURN} from '../../shared/utils/return-verify.util';
import {TwoPasswordMatchValidator, TwoPasswordValidator, VALIDATORS} from '../../shared/utils/validators/validators.collection';
import {TWBase} from '../../shared/TWBase.ui';
import {Lang} from '../../shared/const/language.const';
import {RouterService} from '../../shared/service/router.service';
import {WHERE} from '../../shared/entity/where.enum';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent extends TWBase implements OnInit {
    
    oldPasswordHide: boolean = true;
    passwordHide: boolean = true;
    form: FormGroup;
    updating: boolean = false;      // true为在修改密码中
    
    constructor(
        private formBuilder: FormBuilder,
        private userSV: UserService,
        private routerSV: RouterService
    ) {
        super();
    }
    
    ngOnInit() {
        let validator = {...TwoPasswordValidator};
        validator['oldPassword'] = VALIDATORS.case0;
        this.form = this.formBuilder.group(validator, TwoPasswordMatchValidator);
    }
    
    commitChanges() {
        if(!this.updating) {
            this.updating = true;
            this.userSV.changePassword(this.form.getRawValue()).pipe(delay(2000)).subscribe(r => {
                if(!r) {
                    this.presentToast(Lang.Lang_73, null, 900);
                    setTimeout(_ => {
                        this.routerSV.to(WHERE.login);
                    }, 1500);
                } else this.presentToast(String(r.msg));
                this.updating = false;
            });
        }
    }
}
