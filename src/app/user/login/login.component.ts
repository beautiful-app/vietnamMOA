import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../shared/service/user.service';
import {Storage} from '@ionic/storage';
import {STORAGE_KEY} from '../../shared/const/storage-key.const';
import {Router} from '@angular/router';
import {RouterService} from '../../shared/service/router.service';
import {delay} from 'rxjs/operators';
import {VALIDATORS} from '../../shared/utils/validators/validators.collection';
import {ROUTE} from '../../shared/const/route.enum';
import {RETURN} from "../../shared/utils/return.util";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    
    form: FormGroup;
    passwordHide = true;
    loginError: boolean = false;
    inLogging: boolean = false;
    
    
    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private userSV: UserService,
        private storage: Storage,
        private router: Router,
        private routerSV: RouterService
    ) {
        this.form = this.formBuilder.group({
            username: VALIDATORS.case6,
            password: VALIDATORS.case6,
            remember: [false, []],
            ms: []
        });
    }
    
    ngOnInit() {
        this.storage.get(STORAGE_KEY.login_info).then(r => {
            // 判断是否超过90天：删除账号密码并重新登录
            if (r && new Date().getTime() < (r.ms + 1000 * 60 * 60 * 24 * 90)) {
                this.form.patchValue(r);
            } else this.storage.remove(STORAGE_KEY.login_info);
        });
    }
    
    ngOnDestroy(): void {
        console.log('login销毁');
    }
    
    /**
     * 登录
     */
    doLogin() {
        // 禁用登录按钮
        this.inLogging = true;
        console.log(this.form.get('ms1'));
        // 如果用户记住密码，那么保存信息,否则忘记密码
        if (this.form.getRawValue().remember) this.storage.set(STORAGE_KEY.login_info, {
            ...this.form.getRawValue(),
            ms: this.form.get('ms') ? this.form.get('ms').value : new Date().getTime()
        });
        else this.storage.remove(STORAGE_KEY.login_info);
        this.userSV.doLogin(this.form.getRawValue()).pipe(delay(2000)).subscribe(r => {
            this.inLogging = false;
            if (RETURN.isTrue(r)) {
                this.routerSV.to(ROUTE.tabs_home);
                this.loginError = false;
            } else if (!RETURN.networkError(r)) this.loginError = true;
        }, null, () => this.inLogging = false);
    }
    
    /**
     * 跳转到重置密码页面
     */
    resetPassword() {
        this.routerSV.to(ROUTE.reset_password);
    }
}
