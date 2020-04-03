import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../shared/service/user.service';
import {Storage} from '@ionic/storage';
import {STORAGE_KEY} from '../../shared/const/storageKey.const';
import {RETURN} from '../../shared/utils/return-verify.util';
import {Router} from '@angular/router';
import {RouterService} from '../../shared/service/router.service';
import {route} from '../../shared/const/route.enum';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
    form: FormGroup;
    loginForm: FormGroup;
    isShow = false;
    passwordHide = true;
    loginError: boolean = false;
    inLogging: boolean = false;
    resetPasswordRoute: string = route.reset_password;
    private infoCheck: boolean = false;
    
    
    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private userSV: UserService,
        private storage: Storage,
        private router: Router,
        private routerSV: RouterService
    ) {
        this.form = this.formBuilder.group({
            username: ['', Validators.compose([Validators.minLength(4)])],
            password: ['', Validators.compose([Validators.minLength(4)])],
            remember: [false, []]
        });
    }
    
    ngOnInit() {
        this.storage.get(STORAGE_KEY.login_info).then(r => {
            if(r) this.form.patchValue(r);
        });
    }
    
    
    doLogin() {
        // 禁用登录按钮
        this.inLogging = true;
        // 如果用户记住密码，那么保存信息,否则忘记...
        if(this.form.getRawValue().remember) this.storage.set(STORAGE_KEY.login_info, this.form.getRawValue());
        else this.storage.remove(STORAGE_KEY.login_info);
        
        this.userSV.doLogin(this.form.getRawValue()).pipe(delay(2000)).subscribe(r => {
            this.inLogging = false;
            if(RETURN.isTrue(r)) {
                this.routerSV.to1(route.tabs_home);
                this.loginError = false;
            } else if(!RETURN.networkError(r)) this.loginError = true;
        });
    }
    
    resetPassword() {
        this.routerSV.to1(route.reset_password);
    }
}
