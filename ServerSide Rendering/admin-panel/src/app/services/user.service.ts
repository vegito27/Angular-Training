import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  base_url="http://localhost:4000/user"

  constructor(private _http:HttpClient) { }

  addUser(data){
    return this._http.post<any>(this.base_url,data)
  }

  getUser(){
    return this._http.get<any>(this.base_url)
  }

  delete(id){    
    console.log(this.base_url+`/${id}`)
    return this._http.delete<any>(this.base_url+`/${id}`)
  }
}
