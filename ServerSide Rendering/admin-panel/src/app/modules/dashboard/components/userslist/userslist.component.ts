import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  Auth(response){

    console.log("hi")

  }

  constructor() { }

  ngOnInit(): void {
  }

 

}
