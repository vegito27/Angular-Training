import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { emailValidator } from 'src/app/shared/Validators/emaill.validator';
import { confirmValidator, passwordValidator } from 'src/app/shared/Validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  ischecked:boolean=false

  // registrationForm:FormGroup
  userForm:FormGroup

  Error:any
  emailExists: boolean=false;

  //create userModel

//recommended in document
  get firstName(){
    return this.userForm.get('firstName')
  }

  get userName(){
    return this.userForm.get('userName')
  }

  get email(){
    return this.userForm.get('email')
  }

  get phone(){
    return this.userForm.get('phone')
  }

  get password(){
    return this.userForm.get('password')
  }

  get confirmPassword(){
    return this.userForm.get('confirmPassword')
  }

  constructor(private _userService:UserService,private fb:FormBuilder,private route:Router) { }

  
  ngOnInit(): void {

    this.userForm=this.fb.group({

      firstName:['',[Validators.required,Validators.minLength(4)]],
      lastName:[''],
      userName:['',[Validators.required,Validators.pattern("^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")]],
      phone:['',[Validators.required,Validators.minLength(10)]],
      email:['',[Validators.required,Validators.email]],
      isAdmin:[false],
      password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmPassword:['',[Validators.required,Validators.minLength(6)]],}
      ,{validator:passwordValidator})
  
  }

  toggle(){
    this.ischecked=!this.ischecked
  }

  // isNumberKey(evt)
  // {
  //     var charCode = (evt.which) ? evt.which : evt.keyCode
  //     if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57))
  //         return false;
  //     return true;
  // }

  SignUp(){

    console.log(this.userForm);
    

    if(this.userForm.valid){
      this._userService
      .addUser(this.userForm.value)
      .subscribe((response)=>{
        if(response){
            this.route.navigateByUrl('/dashboard')
            console.log(response);
          }
        },
          (error)=>{ 

            this.Error=error.error
            // if(error.error.userName){
            //   this.Error.UserName=error.error.userName
            // }else{
            //   this.Error.UserName=""
            // }

            // if(error.error.email){
            //   this.Error.Email=error.error.email
            //   this.emailExists=true
            // }else{
            //   this.emailExists=false
            //   this.Error.Email=""
            // }

            console.log(this.Error)
          }
        )
      }
      else{
        console.log("in-valid form");
        
      }
    }
}
