import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotedService } from 'src/app/shared/noted.service';
import { Note } from 'src/shared/note.model';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

  constructor(private notesService:NotedService,private router:Router,private route :ActivatedRoute) { }

  note:Note;
  new:boolean;
  id:number;
  edit:Note

  ngOnInit(): void {

    this.route.params.subscribe((params:Params)=>{
      this.note=new Note() 

      this.id=params.id

      if(params.id=="new"){
        this.new=false
        

        console.log("inn the if ",this.new)
      }else{

        this.new=true

        this.note=this.notesService.get(params.id)
        
        console.log("in nthe else",this.new)
      }
    })

  }

  onSubmit(form:NgForm){

    if(!this.new){
      
      this.notesService.add(form.value);

      console.log("in the if")

      this.router.navigateByUrl('/')

    }else{

      console.log(form)

     console.log("in the update")

     this.notesService.update(this.id,form.value.title,form.value.body)
     this.router.navigateByUrl('/')

    }
  }

  cancel(){
    this.router.navigateByUrl('/')
   
  }


}
