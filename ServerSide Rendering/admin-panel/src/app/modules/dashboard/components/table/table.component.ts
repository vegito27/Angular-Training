import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { nextTick } from 'process';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input('user') user:any
  @Input('size') size:any
  @Output() deleteUser=new EventEmitter



  modifiedArray;
  index:number=1
  hide:boolean=false
  linkTracker=1


  // User:any=this.user.slice(0,6)


  headElements=['#','Username','Phone',"Posts","Action"]
  constructor(private _userservice:UserService) { }


  ngOnInit(): void {
    //getting undefined
    // console.log(this.user.length)
  }

  implementPaginate(ref:any){
    console.log(ref)
    
  }

  increment(i){
    let modulo=this.size/6;
   let totalPages=modulo===0?modulo:modulo+1
  
    if(this.index<=totalPages-1){
      this.index++;
      // if(this.linkTracker%3==0){
      //   this.linkTracker=0
      // }else{
      //   this.linkTracker++
      // }
    }
  }

  decrement(){
    if(this.index>0){
    this.index--;
    }
  }

  fireEvent(id){
    this.deleteUser.emit(id)
  }
}
