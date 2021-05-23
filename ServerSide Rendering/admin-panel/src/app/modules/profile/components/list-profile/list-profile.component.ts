import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profiles/profile.service';

@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.css']
})
export class ListProfileComponent implements OnInit {

  prev:number
  next:number=0
  data:any

  constructor(private profileservice:ProfileService) { 
    this.profileservice.SharingData.subscribe(data=>{
      this.data=data
    })
  }

  load(i:number){
    this.prev=this.next
    this.next=i

    this.profileservice.SharingData.next(i)

  }

  get isUpdate():boolean{
    return this.profileservice.update
  }

  toggleNavBar(){
    this.profileservice.toggleNavBarVisisbility()
    console.log("list")
  }










 

  ngOnInit(): void {
  }

}
