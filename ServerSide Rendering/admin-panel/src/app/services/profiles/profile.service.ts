import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {base_url} from'./../urls/urls.js'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  base_url="http://localhost:4004/profile"

  update:boolean=true

  isUpdate:Subject<boolean>=new Subject<boolean>()

  SharingData = new Subject();  

  constructor(private _http:HttpClient) { 
    this.isUpdate.subscribe(value=>{
      this.update=value
    })
  }

  toggleNavBarVisisbility(){
    console.log("service")
    this.isUpdate.next(!this.update)
  }


  getProfile(id){
    return this._http.get<any>(this.base_url+`${id}`)
  }

  createProfile(data){
    return this._http.post<any>(this.base_url,data)
  }


  updateProfile(data,id){
    return this._http.post<any>(`${this.base_url}/${id}`,data)
  }





}
