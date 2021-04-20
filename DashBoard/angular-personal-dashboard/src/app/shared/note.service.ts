import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes:Note[]=[]


  constructor() { }

  getNotes(){
    return this.notes 
  }

  getNote(id:string){
   return this.notes.find(data=>data.id===id)
  }

  addNote(note:Note){
    this.notes.push(note)
  }

  updateNote(id:string,updatedField:Partial<Note>){
    const note=this.getNote(id);
    Object.assign(note,updatedField) 

  }

  deleteNote(id:string ){
    // findIndex gives index
    const noteIndex=this.notes.findIndex(n=>n.id===id)

    if(noteIndex==-1) return 

    // splice takes index and number of elements of be removed from array in parameter
    this.notes.splice(noteIndex,1)

  }
  
}
