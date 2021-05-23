import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // islogout:Boolean=this.userservice.authorised

  @Input() isAuthenticated

  isAuthorised:boolean

  // asideVisible;
  isAuth:any

  constructor(private userservice:UserService,private route:Router) {

     this.isAuth=this.userservice.getUserId()

    if(this.isAuth.length!==0){
      this.isAuthorised=true
    }else{
      this.isAuthorised=false
    }
   }

  ngOnInit(){
   
  }

  logout(){
    this.userservice.removeUserId()
    this.isAuthorised=false
    this.route.navigateByUrl('/login')

  }


}
