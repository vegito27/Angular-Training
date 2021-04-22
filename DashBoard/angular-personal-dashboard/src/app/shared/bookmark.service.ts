import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks:Bookmark[]=[
    new Bookmark("Wikipedia","https://wikipedia.org"),
    new Bookmark("Google","https://google.com"),
    new Bookmark('Youtube','https://youtube.com')

]
  
  constructor() { }

  getBookmarks(){
    return this.bookmarks
  }
  getBookmark(id:string){
    return this.bookmarks.find(data=>data.id===id)
  }

  addBokmark(bookmark:Bookmark){

    this.bookmarks.push(bookmark)

  }

  updateBookmark(id:string,updateFields:Partial<Bookmark>){

    const bookmark=this.getBookmark(id)

    Object.assign(bookmark,updateFields)

  }

  deleteBookMark(id:string){
    let index=this.bookmarks.findIndex(b=>b.id===id)

    if(index===-1) return 
    this.bookmarks.splice(index,1);

  }
}
