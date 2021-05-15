import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagiation',
  templateUrl: './pagiation.component.html',
  styleUrls: ['./pagiation.component.css']
})
export class PagiationComponent implements OnInit {

  // @Input('user') user:any
  // @Output('modified') changeArray=new EventEmitter;








  constructor() { }

  ngOnInit(): void {
  }

  implementPaginate(pageIndex:number){

    let start=pageIndex*6
    // let intermediate=this.user.slice(pageIndex*6-6,pageIndex*6)

  }



}
