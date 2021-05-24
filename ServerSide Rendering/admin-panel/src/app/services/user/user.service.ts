import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../models/user';
import {base_url} from './../urls/urls.js'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  base_url="http://localhost:4004/user"

  user:any
  size:number
  
  isAuthorised:boolean=false
  authorisedChanged:Subject<boolean>=new Subject<boolean>()
  SharingData = new Subject();  


  isSidebarVisible: boolean;
  sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>()

  constructor(private _http:HttpClient) {

    console.log(this.base_url)
    this.sidebarVisibilityChange.subscribe((value) => {
      this.isSidebarVisible = value
    });

    // changed the value in constructor

    this.authorisedChanged.subscribe(value=>{
      this.isAuthorised=value
    })
  }

  isAuthorisedChanged(){
    this.authorisedChanged.next(!this.isAuthorised)
  }

  toggleSidebarVisibility() {
    this.sidebarVisibilityChange.next(!this.isSidebarVisible);
  }

  addUser(data){
    
    return this._http.post<any>(this.base_url,data)
  }

  setUserData(user){
    localStorage.setItem('user',user)
  }

  removeUserData(){
    localStorage.removeItem('user')
  }

  getUserData(){
    return localStorage.getItem('user')
  }

  getUser(){
    return this._http.get<any>(this.base_url)
  }

  loginUser(data){
    return this._http.post<any>(`${this.base_url}/login`,data)
  }

  delete(id){    
    console.log(this.base_url+`/${id}`)
    return this._http.delete<any>(this.base_url+`/${id}`)
  }

  getupdatedUser(user:User){
    this.user=user
    return this.user 
  }

}
