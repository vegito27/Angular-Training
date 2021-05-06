import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  emailValid:boolean=false
  passValid:boolean=false


  check(email:string){
      this.emailValid=this.authService.isvalidEmail(email)
  }

  checkpass(password:string){
    this.passValid=this.authService.isValidPass(password)
  }

  onSignupButtonClicked(email: string, password: string) {

    this.check(email)

    if(this.emailValid){
      console.log(this.emailValid);
      this.emailValid=false
        console.log("true")

    }else{
        this.emailValid=true
        console.log("false");
        return false
    }


      console.log(email,password);

      this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {

        // if(res.error){
        //   this.emailValid=false
        //
        // }
        console.log(res);
        this.router.navigate(['/lists']);
    });
  }


}
