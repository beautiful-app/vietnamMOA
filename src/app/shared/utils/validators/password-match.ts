import {FormGroup, Validators} from '@angular/forms';
import {APP} from '../../../core/singleton.export';
import {Lang} from '../../const/language.const';

/**
 * @Description: 验证器，用于验证连个表单输入值是否相等，常用与密码与确认密码
 */
export function twoValueMatch(controlName: string, matchingControlName: string, msg?: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];
		if (matchingControl.errors && control.errors) return;
		
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({msg: Lang.Lang_87});
		} else {
			// 验证复杂度
			let reg = `^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{${APP.minPasswordLength},}$`;
			var re = new RegExp(reg);
			if (!re.test(matchingControl.value)) matchingControl.setErrors({msg: Lang.Lang_88});
			else matchingControl.setErrors(null);
		}
	};
}

/**
 * @Description: 密码复杂度验证器
 */
export function complexPassword(controlName: string, matchingControlName: string, msg: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];
		
		if (matchingControl.errors && control.errors) {
			return;
		}
		
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({msg: msg});
		} else {
			matchingControl.setErrors(null);
		}
	};
}


