import {AbstractControl} from '@angular/forms'

export function emailValidator(control:AbstractControl):{[key:string]:boolean}|null{

    let validator=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    let email=control.get('email')

    if(validator.test(String(email).toLowerCase())){
        console.log("Validator called")
        return {'match':true}
    }else{
        return null
    }

}