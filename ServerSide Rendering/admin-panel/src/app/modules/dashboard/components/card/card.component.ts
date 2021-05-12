import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('red') red:string
  @Input('yellow') yellow:string
  @Input('green') green:string

  userCount:number=10
  postcount:number=20
  studentUsercount:number=30


  constructor() { }

  ngOnInit(): void {
  }

}
