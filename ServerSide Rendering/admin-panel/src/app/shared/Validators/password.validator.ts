import {FormGroup} from '@angular/forms'

export function confirmValidator(controlName:string,matchingControlName:string){

    return (formGroup:FormGroup)=>{
        const control=formGroup.controls[controlName]
        const matchingControl=formGroup.controls[matchingControlName]

        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}





import {AbstractControl} from '@angular/forms'

export function passwordValidator(control:AbstractControl):{[key:string]:boolean}| null {
    
    const password=control.get('password')
    const confirmPassword=control.get('confirmPassword')

    if(password.pristine && confirmPassword.pristine){
        return null
    }
    return password && confirmPassword && password.value!=confirmPassword.value?{'misMatch':true}:null 
}

