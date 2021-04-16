import { transition, trigger ,style, animate,query, stagger} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotedService } from 'src/app/shared/noted.service';
import { Note } from 'src/shared/note.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations:[
    trigger('itemAnim',[
      transition('void=> *',[
        style({
          height:0,
          opacity:0,
          transform:'scale(0.85)',
          // 'margin-bottm':0,
          paddingTop:0,
          paddingLeft:0,
          paddingRight:0,
          paddingBottom:0
        }),
        animate('50ms',style({
          height:'*',
          paddingTop:'*',
          paddingBottom:'*',
          paddingLeft:'*',
          paddingRight:'*'
        })),
        animate(200)
      ]),

      transition('* => void',[

        animate(50,style({
          transform:'scale(1.05)'
        })),
        // then scale down

        animate(50,style({
          transform:'scale(1)',
          opacity:0.75
        })),

        animate('120ms ease-out',style({
          transform:'scale(0.68)',
          opacity:0
        })),

        // animate space(includes height,margin,space)

        animate('150ms ease-out',style({
          opacity:0,
          height:0,
          paddingTop:0,
          paddingBottom:0,
          paddingRight:0,
          paddingLeft:0

        }))


      ])
    ]),
    trigger('listAnim',[transition('*=>*',[
      query(':enter', [style({opacity:0,height:0}),stagger(100,[animate('0.2s ease')])],{optional:true})
    ])]
  )]
  
})
export class NotesListComponent implements OnInit {

  notes:Note[]=new Array<Note>();

  filteredNotes:Note[]=new Array<Note>();

  constructor(private notesService:NotedService) { }

  ngOnInit() {

    // retrive all nodes before load 

    this.notes=this.notesService.getAll()

    this.filteredNotes=this.notesService.getAll()

  }

  deleteNote(id:number){

    this.notesService.delete(id)

  }

  filter(query:string){

    query=query.toLowerCase().trim()

    let allResults:Note[]=new Array<Note>();

    // split up the search query into indivodual words

    let terms:string[]=query.split(' ')

    terms=this.removeDuplicates(terms)

    // compiles all relevent results into allResults array

    terms.forEach(term=>{

      let results:Note[]=this.relevantNotes(term);

      // append results to allResults Array

      allResults=[...allResults,...results]

    })

    // all results will include duplicate nodes

    let uniqueResults=this.removeDuplicates(allResults)

    this.filteredNotes=uniqueResults

    this.sortByRelevance(allResults)


  }

  removeDuplicates(arr:Array<any>):Array<any>{

    let uniqueResults:Set<any>=new Set<any>();

    arr.forEach(e=>uniqueResults.add(e))

    return Array.from(uniqueResults)

  }

  relevantNotes(query:string):Array<Note>{

    query=query.toLowerCase().trim();

    let relevantNotes=this.notes.filter(note=>{

      if(note.title && note.title.toLowerCase().includes(query)){
        return true
      }

      if(note.body && note.body.toLowerCase().includes(query)){
        return true
      }

      return false
    })

    return relevantNotes
  }

  sortByRelevance(searchResult:Note[]){

    let noteCountObj:Object={}

    searchResult.forEach(note=>{
      let noteId=this.notesService.getId(note)

      if(noteCountObj[noteId]){

        noteCountObj[noteId]+=1

      }else{
        noteCountObj[noteId]=1
      }
    })

    this.filteredNotes=this.filteredNotes.sort(
      (a:Note,b:Note)=>{
        let aId=this.notesService.getId(a);
        let bId=this.notesService.getId(b);

        let aCount=noteCountObj[aId]
        let bCount=noteCountObj[bId]

        return bCount-aCount
    })

  }

}
