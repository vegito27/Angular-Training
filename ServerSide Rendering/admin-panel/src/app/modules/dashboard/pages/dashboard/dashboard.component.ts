import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:any
  size:number

  constructor(private _userService:UserService) { }

  setUser(){
    this._userService.getUser().subscribe((response)=>{
      this.user=response
      this.size=response.length
    })
  }

  ngOnInit(): void {
    this.setUser()
  }

  updateUser(id){
    this.user=this.user.filter(user=>user._id!==id)

  }

  deleteUser(id:any){
    this._userService.delete(id).subscribe(response=>{
      this.updateUser(id)
    
    },error=>console.log(error))
  }
}
