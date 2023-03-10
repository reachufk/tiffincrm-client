import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export function validateAllFormFields(control: AbstractControl) {
    if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(field => {
            validateAllFormFields(control.get(field));
        });
    } else if (control instanceof FormArray) {
        for (const c of control.controls) {
            validateAllFormFields(c);
        }
    } else if (control instanceof FormControl) {

    }
    control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    control.markAsDirty();
    control.markAsTouched();
}



