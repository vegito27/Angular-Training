import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient,private userservice) { }


  //  getAuthToken(email,password){
  // 	return this._http.post('http://localhost:4004/user',{"email":email,"password":password})
  // }


  setAuthToken(token){
    localStorage.setItem('token',token)
  }

  getAuthToken(){
    return localStorage.getItem('token')
  }


}
