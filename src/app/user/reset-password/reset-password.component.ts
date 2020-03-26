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

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent extends TWBase implements OnInit {
    oldPasswordHide: boolean = true;
    passwordHide: boolean = true;
    form: FormGroup;
    inLoad: boolean = false;
    countDown: number = 0;
    resultMsg: string = '';
    headShow: boolean = true;
    
    @ViewChild('header', {static: false}) div3: ElementRef;
    updating: boolean = false;
    
    
    constructor(
        private formBuilder: FormBuilder,
        private userSV: UserService,
        private dialog: MatDialog,
        private routerSV: RouterService,
        private render2: Renderer2,
        private cdr: ChangeDetectorRef,
        private deviceSV: DeviceService
    ) {
        super();
        let validatorGroup = {...TwoPasswordValidator};
        validatorGroup['authCode'] = VALIDATORS.case1;
        validatorGroup['account'] = VALIDATORS.case1;
        this.form = this.formBuilder.group(validatorGroup, TwoPasswordMatchValidator);
    }
    
    ngOnInit() {
        
    }
    
    getCode() {
        this.inLoad = true;
        this.userSV.confirmPhoneForResetPassword(this.form.getRawValue().account).subscribe(r => {
            this.openDialog(this.dialog, this.deviceSV, PhoneConfirmDialog, r).subscribe(rr => {
                // 请求接口获取验证码
                if(rr) this.userSV.getCodeForRestPassword(r.id).subscribe(rrr => {
                    if(rrr) {
                        this.inLoad = false;
                        this.countDown = 60;
                        let interval = setInterval(_ => {
                            --this.countDown;
                            if(this.countDown == 0) clearInterval(interval);
                        }, 1000);
                    } else this.inLoad = false;
                });
                else this.inLoad = false;
            });
        });
    }
    
    commitChanges() {
        if(!this.updating) {
            this.updating = true;
            this.userSV.resetPassword(this.form.getRawValue()).pipe(delay(2000)).subscribe(r => {
                if(RETURN.isSucceed(r)) {
                    this.form.reset();
                    this.presentToast(Lang.Lang_73);
                    this.routerSV.to(WHERE.login);
                } else {
                    // this.presentToast('修改失败,请重新尝试!');
                    if(r.msg) this.resultMsg = r.msg;
                }
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
