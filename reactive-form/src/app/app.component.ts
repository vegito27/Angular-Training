import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormArray  } from '@angular/forms';
import {FormBuilder,Validators } from '@angular/forms'
import { passwordValidator } from './shared/password.validators';
import {forbiddenNameValidator} from './shared/username.validator';
import {RegistrationService} from './registration.service'
// import { emailValidator } from './shared/email.validators'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  registrationForm:FormGroup

  constructor(private fb:FormBuilder,private _registrationService:RegistrationService){}

  get userName(){
    return this.registrationForm.get('userName')
  }

  get email(){
    return this.registrationForm.get('email')
  }

  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray
  }

  addAlternateEmail(){
    this.alternateEmails.push(this.fb.control(''))
  }

  ngOnInit(){
    
    this.registrationForm=this.fb.group({
      userName:['',[Validators.required,Validators.minLength(3),forbiddenNameValidator]],
      email:['',Validators.required],
      subscribe:[false],
      password:[''],
      confirmPassword:[''],
      address:this.fb.group({
        city:[''],
        state:[''],
        postalCode:['']
      }),
      alternateEmails:this.fb.array([])},
    {validator:passwordValidator}
    )

      this.registrationForm
      .get('subscribe')
      .valueChanges
      .subscribe(checkedValue=>{
        const email=this.registrationForm.get('email')

        if(checkedValue){
          email.setValidators(Validators.required) 
        }else{
          email.clearValidators()
        }
        email.updateValueAndValidity()
      }) 
  }

  loadAPIData(){
    this.registrationForm.patchValue({
      userName:"Bruce",
      password:"test",
      confirmPassword:"test"
    })
  }
  
  onSubmit(){
    console.log(this.registrationForm.value)
    this._registrationService.register(this.registrationForm.value).subscribe(response=> console.log("Success",response))
  }

}
