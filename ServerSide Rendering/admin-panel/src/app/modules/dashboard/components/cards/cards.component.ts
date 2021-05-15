import { Component, Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  bg:boolean=true
  totalUser:number
  text:any
  @Input('size') Total_Users:any

  constructor() { }

  ngOnInit(): void {
  }

}
