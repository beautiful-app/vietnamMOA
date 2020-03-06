import {FormGroup, Validators} from '@angular/forms';

// export function passwordMatch(controlName: string, matchingControlName: string): any {
//     if(group) {
//         if(group.get('password').value !== group.get('confirm').value) {
//             return {notMatching: true};
//         }
//     }
//
//     return null;
// }


// custom validator to check that two fields match
export function twoValueMatch(controlName: string, matchingControlName: string, msg: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        
        if(matchingControl.errors && control.errors) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        
        // set error on matchingControl if validation fails
        if(control.value !== matchingControl.value) {
            matchingControl.setErrors({msg: msg});
        } else {
            matchingControl.setErrors(null);
        }
    };
}


