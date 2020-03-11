import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/service/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VALIDATORS} from '../../../shared/utils/validators/validators.collection';
import {ActivatedRoute} from '@angular/router';
import {RouterService} from '../../../shared/service/router.service';
import {WHERE} from '../../../shared/entity/where.enum';
import {TWBase} from '../../../shared/TWBase.ui';
import {Location} from '@angular/common';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-change-info',
    templateUrl: './change-info.component.html',
    styleUrls: ['./change-info.component.scss'],
})
export class ChangeInfoComponent extends TWBase implements OnInit {
    form: FormGroup;
    
    constructor(
        private userSV: UserService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private routerSV: RouterService,
        private location: Location,
        private navCtrl: NavController
    ) {
        super();
        // let a = this.route.paramMap.pipe(
        //     switchMap((params: ParamMap) => params.get('cellphone'))
        // );
        // this.form.setValue({phoneNumber: a});
    }
    
    ngOnInit() {
        this.form = this.formBuilder.group({phoneNumber: VALIDATORS.case5});
        let a = this.route.snapshot.paramMap.get('cellphone');
        this.form.setValue({phoneNumber: a});
    }
    
    changePhoneNumber() {
        // this.location.back();
        console.log('path', this.location.path());
        console.log('state', this.location.getState());
        this.navCtrl.back();
        
        return;
        
        if(this.form.valid) {
            this.userSV.setPhoneNumber(this.form.getRawValue().phoneNumber).subscribe(r => {
                // 修改成功后重新获取用户数据，并导航到个人信息页
                if(r) this.userSV.getUserInfoByToken().subscribe(rr => {
                    if(rr) this.routerSV.to(WHERE.back);
                    else this.presentToast('修改失败,请重新提交');
                });
            });
        }
    }
}
