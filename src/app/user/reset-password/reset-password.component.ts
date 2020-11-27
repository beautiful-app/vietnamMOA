import {ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../shared/service/user.service';
import {MatDialog} from '@angular/material';
import {PhoneConfirmDialog} from './phone-confirm-dialog';
import {TWBase} from '../../shared/TWBase.ui';
import {RouterService} from '../../shared/service/router.service';
import {
    TwoPasswordMatchValidator,
    TwoPasswordValidator,
    VALIDATORS
} from '../../shared/utils/validators/validators.collection';
import {Lang} from '../../shared/const/language.const';
import {delay} from 'rxjs/operators';
import {DeviceService} from '../../shared/service/device.service';
import {LanguageType} from '../../shared/const/language-type.enum';
import {LanguageService} from '../../shared/service/language.service';
import {RETURN} from "../../shared/utils/return.util";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent extends TWBase {
    passwordHide: boolean = true;   // 隐藏密码开关
    form: FormGroup;                // form对象
    inLoad: boolean = false;        // 加载中开关
    countDown: number = 0;          // 计数
    resultMsg: string = '';         // 请求消息
    headShow: boolean = true;       // 显示头部开关
    langZH = LanguageType.zh;       // 语言设置
    sysLangType: string;            // ngrx
    updating: boolean = false;      // 请求中开关
    @ViewChild('header', {static: false}) div3: ElementRef;
    
    
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
    
    /**
     * 通过短信获取验证码
     */
    getCode() {
        this.inLoad = true;
        this.userSV.confirmPhoneForResetPassword(this.form.getRawValue().account).subscribe(r => {
            if (!r) this.inLoad = false;
            this.openDialog(this.dialog, this.deviceSV, PhoneConfirmDialog, r).subscribe(rr => {
                // 请求接口获取验证码
                if (rr) this.userSV.getCodeForRestPassword(r.id).subscribe(rrr => {
                    if (!rrr) {
                        this.inLoad = false;
                        this.countDown = 60;
                        let interval = setInterval(_ => {
                            --this.countDown;
                            if (this.countDown == 0) clearInterval(interval);
                        }, 1000);
                    } else this.presentToast(rrr);
                    this.inLoad = false;
                });
                else this.inLoad = false;
            });
        });
    }
    
    /**
     * 提交更新
     */
    commitChanges() {
        if (!this.updating) {
            this.updating = true;
            this.userSV.resetPassword(this.form.getRawValue()).pipe(delay(2000)).subscribe(r => {
                if (RETURN.isSucceed(r)) {
                    this.form.reset();
                    this.presentToast(Lang.Lang_73);
                    this.routerSV.toLogin();
                } else if (r.msg) {
                    // 验证码不正确
                    if (r.code == "100106") this.resultMsg = Lang.Lang_85;
                    else this.resultMsg = r.msg;
                }
                this.updating = false;
            });
        }
    }
}
