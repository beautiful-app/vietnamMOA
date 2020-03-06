import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/service/user.service';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APP} from '../../../../environments/app.config';
import {VALIDATORS} from '../../../shared/utils/validators/validators.collection';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
    selector: 'app-change-info',
    templateUrl: './change-info.component.html',
    styleUrls: ['./change-info.component.scss'],
})
export class ChangeInfoComponent implements OnInit {
    form: FormGroup;
    
    constructor(
        private userSV: UserService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {
        // let a = this.route.paramMap.pipe(
        //     switchMap((params: ParamMap) => params.get('cellphone'))
        // );
        // this.form.setValue({phoneNumber: a});
    }
    
    ngOnInit() {
        this.form = this.formBuilder.group({phoneNumber: VALIDATORS.case4});
        let a = this.route.snapshot.paramMap.get('cellphone');
        console.log(a);
        this.form.setValue({phoneNumber: a});
    }
    
    changePhoneNumber() {
        console.log(this.form.valid);
        if(this.form.valid) {
            console.log(this.form.getRawValue().phoneNumber);
            this.userSV.setPhoneNumber(this.form.getRawValue().phoneNumber).subscribe(r => {
            
            });
        }
    }
}
