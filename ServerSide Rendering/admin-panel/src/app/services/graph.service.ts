import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor() { }




  setUserData(user:User){



    console.log(user)


  }




}
