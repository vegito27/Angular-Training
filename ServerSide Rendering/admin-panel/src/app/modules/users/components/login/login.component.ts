import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import {LocalStorageService} from 'ngx-webstorage'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup


  get email(){
    return this.loginForm.get('password')
  }

  get password(){
    return this.loginForm.get('email')
  }

  get isAuthorised():boolean{
    return this.userService.isAuthorised
  }

  Error={email:'',password:''}
  isValid=false

  constructor(private fb:FormBuilder,
    private userService:UserService,
    private router:Router
    ,private route:ActivatedRoute,
    private authservice:AuthService) { }

  ngOnInit(): void {

    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onSubmit(){

    this.userService.loginUser(this.loginForm.value).subscribe(response=>{

      if(response.length===0){
        return false
      }
      this.Error={password:'',email:''}
     
      if(response.error){
        let error=response.error

        if(error.email){
          this.Error.email=error.email
          return false
        }
        if(error.password){
          this.Error.password=error.password
        }
      }else{

        if(response.isAdmin){

          this.userService.setUserId(response._id)

          this.router.navigateByUrl('dashboard')
        }else{
          this.router.navigateByUrl('dashboard')

        }
      }
    },error=>console.log(error))

  }

}
