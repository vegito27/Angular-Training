import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotedService } from 'src/app/shared/noted.service';
import { Note } from 'src/shared/note.model';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

  constructor(private notesService:NotedService,private router:Router) { }

  note:Note;

  ngOnInit(): void {
    this.note=new Note()
  }

  onSubmit(form:NgForm){
    // console.log(form)
    this.notesService.add(form.value);

    this.router.navigateByUrl('/')

   
  }

  cancel(){
    console.log('Hello')
  }


}
