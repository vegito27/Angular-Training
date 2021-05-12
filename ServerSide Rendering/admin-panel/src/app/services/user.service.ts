import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  base_url="http://localhost:2000/user"

  constructor(private _http:HttpClient) { }

  addUser(data){

    // console.log(data)

    return this._http.post<any>(this.base_url,data)

  }

}
