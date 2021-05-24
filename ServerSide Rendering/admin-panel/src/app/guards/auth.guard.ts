import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userservice:UserService,private authservice: AuthService,private route :Router){}

  canActivate():boolean{
    if(this.authservice.getAuthToken){
      return true
    }else{
      this.route.navigate(['/login'])
      return false
    }
  }
  
}
