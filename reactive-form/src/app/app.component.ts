import { Component } from '@angular/core';
import { FormGroup,FormControl  } from '@angular/forms';
import {FormBuilder,Validators } from '@angular/forms'
import {forbiddenNameValidator} from './shared/username.validator'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private fb:FormBuilder){}


  get userName(){
    return this.registrationForm.get('userName')
  }

    registrationForm=this.fb.group({

      userName:['',[Validators.required,Validators.minLength(3),forbiddenNameValidator]],
      password:[''],
      confirmPassword:[''],
      address:this.fb.group({
        city:[''],
        state:[''],
        postalCode:['']
      })


    })

  

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
