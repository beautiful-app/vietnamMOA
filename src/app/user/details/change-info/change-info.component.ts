import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/service/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VALIDATORS} from '../../../shared/utils/validators/validators.collection';
import {ActivatedRoute} from '@angular/router';
import {RouterService} from '../../../shared/service/router.service';
import {WHERE} from '../../../shared/entity/where.enum';
import {TWBase} from '../../../shared/TWBase.ui';
import {MatDialog} from '@angular/material';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-change-info',
    templateUrl: './change-info.component.html',
    styleUrls: ['./change-info.component.scss'],
})
export class ChangeInfoComponent extends TWBase implements OnInit {
    form: FormGroup;
    inModify: boolean = false;
    
    constructor(
        private userSV: UserService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private routerSV: RouterService,
        private dialog: MatDialog
    ) {
        super();
    }
    
    ngOnInit() {
        this.form = this.formBuilder.group({phoneNumber: VALIDATORS.case5});
        let phoneNumber = this.route.snapshot.paramMap.get('phoneNumber');
        console.log(this.route.snapshot.paramMap);
        console.log('获取到的手机号:', phoneNumber);
        this.form.setValue({phoneNumber: phoneNumber});
    }
    
    changePhoneNumber() {
        if(this.form.valid && !this.inModify) {
            this.inModify = true;
            this.userSV.setPhoneNumber(this.form.getRawValue().phoneNumber).pipe(delay(1000)).subscribe(r => {
                    console.log('r:', r);
                    // 重新获取用户数据，并导航到个人信息页
                    if(r) {
                        this.userSV.getUserInfoByToken().subscribe(rr => {
                            this.inModify = false;
                            this.successTip(this.dialog).subscribe(_ => {
                                this.routerSV.to(WHERE.back);
                            });
                        });
                    } else this.presentToast('修改失败,请重新提交');
                },
                null,
                () => this.inModify = false
            );
        }
    }
}
