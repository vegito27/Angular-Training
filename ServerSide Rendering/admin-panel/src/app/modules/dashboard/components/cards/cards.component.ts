import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  bg:boolean=true

  text:any

  redColor:string

  constructor() { }

  ngOnInit(): void {
  }

}
