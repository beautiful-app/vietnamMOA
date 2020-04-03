import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/service/user.service';
import {MatDialog} from '@angular/material';
import {PhoneConfirmDialog} from './phone-confirm-dialog';
import {TWBase} from '../../shared/TWBase.ui';
import {RETURN} from '../../shared/utils/return-verify.util';
import {RouterService} from '../../shared/service/router.service';
import {WHERE} from '../../shared/entity/where.enum';
import {TwoPasswordValidator, TwoPasswordMatchValidator, VALIDATORS} from '../../shared/utils/validators/validators.collection';
import {Lang} from '../../shared/const/language.const';
import {delay} from 'rxjs/operators';
import {DeviceService} from '../../shared/service/device.service';
import {LanguageType} from '../../shared/const/language-type.enum';
import {LanguageService} from '../../shared/service/language.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent extends TWBase {
    oldPasswordHide: boolean = true;
    passwordHide: boolean = true;
    form: FormGroup;
    inLoad: boolean = false;
    countDown: number = 0;
    resultMsg: string = '';
    headShow: boolean = true;
    // langType = LanguageType;
    langZH = LanguageType.zh;
    sysLangType: string;
    
    @ViewChild('header', {static: false}) div3: ElementRef;
    updating: boolean = false;
    
    constructor(
        private formBuilder: FormBuilder,
        private userSV: UserService,
        private dialog: MatDialog,
        private routerSV: RouterService,
        private render2: Renderer2,
        private cdr: ChangeDetectorRef,
        private deviceSV: DeviceService,
        private languageSV: LanguageService
    ) {
        super();
        
        // 根据当前语言环境设置 xx秒后获取短信的字符信息
        this.sysLangType = this.languageSV.sysLanguage;
        
        let validatorGroup = {...TwoPasswordValidator};
        validatorGroup['authCode'] = VALIDATORS.case1;
        validatorGroup['account'] = VALIDATORS.case1;
        this.form = this.formBuilder.group(validatorGroup, TwoPasswordMatchValidator);
    }
    
    getCode() {
        
        this.countDown = 60;
        let interval = setInterval(_ => {
            --this.countDown;
            if(this.countDown == 0) clearInterval(interval);
        }, 1000);
        return;
        
        this.inLoad = true;
        this.userSV.confirmPhoneForResetPassword(this.form.getRawValue().account).subscribe(r => {
            console.log('r:', r);
            if(r) this.openDialog(this.dialog, this.deviceSV, PhoneConfirmDialog, r).subscribe(rr => {
                // 请求接口获取验证码
                if(rr) this.userSV.getCodeForRestPassword(r.id).subscribe(rrr => {
                    if(rrr) {
                        this.inLoad = false;
                        this.countDown = 60;
                        let interval = setInterval(_ => {
                            --this.countDown;
                            if(this.countDown == 0) clearInterval(interval);
                        }, 1000);
                    }
                    this.inLoad = false;
                });
            });
            this.inLoad = false;
        }, null, () => this.inLoad = false);
    }
    
    commitChanges() {
        if(!this.updating) {
            this.updating = true;
            this.userSV.resetPassword(this.form.getRawValue()).pipe(delay(2000)).subscribe(r => {
                if(RETURN.isSucceed(r)) {
                    this.form.reset();
                    this.presentToast(Lang.Lang_73);
                    this.routerSV.to(WHERE.login);
                } else if(r.msg) this.resultMsg = r.msg;
                this.updating = false;
            });
        }
    }
    
    // ionViewWillLeave() {
    //     setTimeout(_ => {
    //         this.headShow = false;
    //         this.cdr.detectChanges();
    //     }, 100);
    // }
    //
}
