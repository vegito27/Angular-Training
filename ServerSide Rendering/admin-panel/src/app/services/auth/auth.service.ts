import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient,private userservice) { }


  getAuthToken(email,password){
  	return this._http.post('http://localhost:4004/user',{"email":email,"password":password}).toPromise()
    .then(function(res){
      return res.json() 
    }).catch(e=>console.log(e))
  }
}
