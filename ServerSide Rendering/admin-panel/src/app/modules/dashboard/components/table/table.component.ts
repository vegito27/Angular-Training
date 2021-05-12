import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  elements: any = [
    {id: 1, username: 'Mark', email: 'trishabh@gmail.com', posts: 10},
    {id: 2, username: 'Jacob', email: 'rishabh@gmail.comton', posts: 20},
    {id: 3, username: 'Larry', email: 'trishabh@gmail.com', posts: 30},
    {id: 4, username: 'Rishabh', email: 'trishabh@gmail.com', posts: 40},
    {id: 5, username: 'Tripathi', email: 'trishabh@gmail.com', posts: 50},
    {id: 6, username: 'Tripathi', email: 'trishabh@gmail.com', posts: 50},
    {id: 7, username: 'Tripathi', email: 'trishabh@gmail.com', posts: 50},
    
  ];

  headElements = ['ID', 'User', 'Email', 'Posts','Actions'];

  constructor() { }

  ngOnInit(): void {
  }

}
