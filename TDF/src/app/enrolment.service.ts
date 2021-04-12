import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {User} from './User'
import {catchError} from 'rxjs/operators'
import {throwError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class EnrolmentService {

  _url='http://localhost:3001/enroll'
  
  constructor(private _http:HttpClient) {}
  
   enroll(user:User){    
      // this._http.post<any>(this._url,user).subscribe(data=>console.log('! Success',data),
      // error=>console.error('Error!',error ));
      return this._http.post<any>(this._url,user).pipe(catchError(this.errorHandler))
   }

   errorHandler(error:HttpErrorResponse){
     return throwError(error)
   }
}
