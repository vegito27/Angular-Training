import { Component, OnInit } from '@angular/core';
import { NotedService } from 'src/app/shared/noted.service';
import { Note } from 'src/shared/note.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  notes:Note[]=new Array<Note>();

  constructor(private notesService:NotedService) { }

  ngOnInit() {
    this.notes=this.notesService.getAll()
  }

  deleteNote(id:number){
    this.notesService.delete(id)
  }

}
