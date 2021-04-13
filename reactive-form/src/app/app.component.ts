import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormArray  } from '@angular/forms';
import {FormBuilder,Validators } from '@angular/forms'
import { passwordValidator } from './shared/password.validators';
import {forbiddenNameValidator} from './shared/username.validator';
import {RegistrationService} from './registration.service'


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
      email:[''],
      subscribe:[false],
      password:[''],
      confirmPassword:[''],
      address:this.fb.group({
        city:[''],
        state:[''],
        postalCode:['']
      }),alternateEmails:this.fb.array([])
    },{validator:passwordValidator})

    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue=>{
       const email=this.registrationForm.get('email')

       if(checkedValue){
         email.setValidators(Validators.required) 
       }else{
         email.clearValidators()
       }

       email.updateValueAndValidity()
    }) 
  }

  // registrationForm=new FormGroup({

  //     userName:new FormControl('Rishabh'),
  //     Password:new FormControl('Password'),
  //     confirmPassword:new FormControl(''),
  //     address: new FormGroup({
  //       city: new FormControl(''),
  //       state: new FormControl(''),
  //       postalCode: new FormControl('')
  //     }) 

  // }) 

  loadAPIData(){
    this.registrationForm.patchValue({
      userName:"Bruce",
      password:"test",
      confirmPassword:"test"
    })
  }


  onSubmit(){
    this._registrationService.register(this.registrationForm.value).subscribe(response=>console.log('Success',response))
  }




  // loadAPIData(){
  //   this.registrationForm.setValue({
  //     userName:"Bruce",
  //     Password:'test',
  //     confirmPassword:'test',
  //     address:{
  //       city:'City',
  //       state:'State',
  //       postalCode:'123456'
  //     }
  //   })
  // }
}
