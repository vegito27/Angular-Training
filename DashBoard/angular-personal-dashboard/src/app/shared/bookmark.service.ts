import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks:Bookmark[]=[]

  storageListenSub:Subscription
  
  constructor() {
    this.storageListenSub= fromEvent(window,'storage').subscribe((event:StorageEvent)=>{
      if(event.key==="bookmarks") this.loadState()
     })
    }
   
   ngOnDestroy(): void {
     if(this.storageListenSub) this.storageListenSub.unsubscribe() 
   }

  getBookmarks(){
    return this.bookmarks
  }

  getBookmark(id:string){
    return this.bookmarks.find(data=>data.id===id)
  }

  addBokmark(bookmark:Bookmark){
    this.bookmarks.push(bookmark)
    this.saveState()
  }

  updateBookmark(id:string,updateFields:Partial<Bookmark>){
    const bookmark=this.getBookmark(id)
    Object.assign(bookmark,updateFields)
    this.saveState()
  }

  deleteBookMark(id:string){
    let index=this.bookmarks.findIndex(b=>b.id===id)
    if(index===-1) return 

    this.bookmarks.splice(index,1)
    this.saveState()
  }

  saveState(){
    localStorage.setItem('bookmarks',JSON.stringify(this.bookmarks))
  }

  loadState(){

    try{
      const notesInStorage=JSON.parse(localStorage.getItem('bookmarks'),(key,value)=>{

        if(key=='url') return new URL(value)

        return value

      }) 
      // if(!notesInStorage) return

  // clears the array while keeping reference
      this.bookmarks.length=0

      this.bookmarks.push(...notesInStorage)
  
  // this.notes=notesInStorage
    }catch(e){
      console.log('There was an error!')
    }
  
  }
}
