import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {UserService} from '../../shared/service/user.service';
import {Storage} from '@ionic/storage';
import {stringify} from 'querystring';
import {STORAGE_KEY} from '../../shared/const/storageKey.const';
import {RETURN} from '../../shared/utils/return-verify.util';
import {Router} from '@angular/router';
import {RouterService} from '../../shared/service/router.service';
import {WHERE} from '../../shared/entity/where.enum';

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
    
    
    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private userSV: UserService,
        private storage: Storage,
        private router: Router,
        private routerSV: RouterService
    ) {
        this.form = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            remember: [false, []]
        });
    }
    
    ngOnInit() {
        this.storage.get(STORAGE_KEY.login_info).then(r => {
            if(r) this.form.patchValue(r);
        });
    }
    
    
    doLogin() {
        
        this.routerSV.to(WHERE.home);
        
        return;
        
        
        // 勾选了记住密码，那么保存信息,否则忘记...
        if(this.form.getRawValue().remember) this.storage.set(STORAGE_KEY.login_info, this.form.getRawValue());
        else this.storage.remove(STORAGE_KEY.login_info);
        this.userSV.doLogin(this.form.getRawValue()).subscribe(r => {
            if(RETURN.isTrue(r)) {
                this.routerSV.to(WHERE.home);
            } else console.log('失败');
        });
    }
}
