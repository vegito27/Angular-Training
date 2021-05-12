import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  ischecked:boolean=false

  registrationForm:FormGroup

  //create userModel

  constructor(private _userService:UserService,private fb:FormBuilder,private route:Router) { }

  userForm=this.fb.group({
    firstName:[''],
    lastName:[''],
    userName:[''],
    phone:[''],
    email:[''],
    isAdmin:[''],
    password:[''],
    confirmPassword:['']
  })



  ngOnInit(): void {
  }

  toggle(){
    this.ischecked=!this.ischecked
  }

  SignUp(){
    console.log(this.userForm)

    this._userService.addUser(this.userForm.value).subscribe(response=> console.log("Success",response))
    
    // this.route.navigateByUrl('dashboard')

  }
}
