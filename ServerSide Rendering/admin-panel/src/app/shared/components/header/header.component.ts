import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // islogout:Boolean=this.userservice.authorised

  @Input() isAuthenticated

  isAuthorised:boolean
  isAuth:any

  constructor(private userservice:UserService,private route:Router) {

     this.isAuth=this.userservice.getUserData()

    if( !this.isAuth || this.isAuth.length!==0 ){
      this.isAuthorised=true
    }else{
      this.isAuthorised=false
    }
   }

  ngOnInit(){
   
  }

  logout(){
    this.userservice.removeUserData()
    this.isAuthorised=false
    this.route.navigateByUrl('/login')

  }


}
