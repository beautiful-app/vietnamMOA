import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/service/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VALIDATORS} from '../../../shared/utils/validators/validators.collection';
import {ActivatedRoute} from '@angular/router';
import {RouterService} from '../../../shared/service/router.service';
import {TWBase} from '../../../shared/TWBase.ui';
import {MatDialog} from '@angular/material';
import {delay} from 'rxjs/operators';
import {Lang} from '../../../shared/const/language.const';

@Component({
	selector: 'app-change-info',
	templateUrl: './change-info.component.html',
	styleUrls: ['./change-info.component.scss'],
})
export class ChangeInfoComponent extends TWBase implements OnInit {
	form: FormGroup;
	inModify: boolean = false;
	flag: any;
	
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
		this.form.setValue({phoneNumber: phoneNumber});
	}
	
	/**
	 *  更改用户手机号
	 */
	changePhoneNumber() {
		if (this.form.valid && !this.inModify) {
			this.inModify = true;
			this.userSV.setPhoneNumber(this.form.getRawValue().phoneNumber).pipe(delay(1000)).subscribe(r => {
					// 重新获取用户数据，并导航到个人信息页
					if (!r) {
						this.userSV.getUserInfoByToken().subscribe(rr => {
							this.inModify = false;
							this.successTip(this.dialog).subscribe(_ => {
								this.routerSV.back();
							});
						});
					} else this.presentToast(Lang.Lang_72);
				},
				null,
				() => this.inModify = false
			);
		}
	}
}
