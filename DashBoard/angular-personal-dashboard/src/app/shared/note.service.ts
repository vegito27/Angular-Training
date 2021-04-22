import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {

  notes:Note[]=[]

  storageListenSub:Subscription

  constructor() { 
    this.loadState()

    this.storageListenSub= fromEvent(window,'storage').subscribe((event:StorageEvent)=>{
     if(event.key==="notes") this.loadState()
    })
  
  }
  ngOnDestroy(): void {
    if(this.storageListenSub) this.storageListenSub.unsubscribe() 
  }

  getNotes(){
    return this.notes 
  }

  getNote(id:string){
   return this.notes.find(data=>data.id===id)
  }

  addNote(note:Note){
    this.notes.push(note)
    this.saveState()
  }

  updateNote(id:string,updatedField:Partial<Note>){
    const note=this.getNote(id);
    Object.assign(note,updatedField)
    this.saveState() 
  }

  deleteNote(id:string ){
    // findIndex gives index
    const noteIndex=this.notes.findIndex(n=>n.id===id)
    if(noteIndex==-1) return 

    // splice takes index and number of elements of be removed from array in parameter
    this.notes.splice(noteIndex,1)
    this.saveState()
  }


  saveState(){
    localStorage.setItem('notes',JSON.stringify(this.notes))
  }

  loadState(){

    try{
      const notesInStorage=JSON.parse(localStorage.getItem('notes')) 
      // if(!notesInStorage) return

  // clears the array while keeping reference
      this.notes.length=0

      this.notes.push(...notesInStorage)
  
  // this.notes=notesInStorage
    }catch(e){
      console.log('There was an error!')
    }
  
  }


}
