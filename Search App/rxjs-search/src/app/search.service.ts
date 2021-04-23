import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http/'
import {Observable,of,EMPTY,observable} from 'rxjs'
import {map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public baseURL="https://api.github.com/search/repositories"
  public searchResult:any

  constructor(private httpClient:HttpClient) { }

  public searchEntries(term):Observable<any>{

    if(term===""){
      console.log("Not defined")

      return of(null)

    }else{
      let params={q:term}

      return this.httpClient.get(this.baseURL,{params}).pipe(
        map(response=>{
          console.log(response)
          return this.searchResult=response['items']
        })
      );
    }
  }

  public _searchEntries(term){
    return this.searchEntries(term)
  }
}
