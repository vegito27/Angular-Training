import { Injectable } from '@angular/core';
import { Note } from 'src/shared/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotedService {
  

  notes:Note[]=new Array<Note>();

  constructor() { }

  getAll(){
    return this.notes
  }

  get(id:number){
    return this.notes[id]
  }

  getId(note:Note){
    return this.notes.indexOf(note)
  }

  add(note:Note){
    let newlength=this.notes.push(note);
    return newlength-1;
  }

  update(id:number,title:string,body:string){

    console.log(this.notes)

    console.log(title)
    let note=this.notes[id];
    note.title=title;
    note.body=body;
  }

  delete(id:number){
    this.notes.splice(id,1);
  }

}
