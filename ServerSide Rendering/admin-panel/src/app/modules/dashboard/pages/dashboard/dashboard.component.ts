import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:User
  size:number

  constructor(private _userService:UserService) { }

  setUser(){
    this._userService.getUser().subscribe((response)=>{
      this._userService.user=response
      this._userService.size=response.length
      
      this.user=this._userService.user
      this.size=this._userService.size
    })
  }

  ngOnInit(): void {
    this.setUser()
  }

  updateUser(id){
    this._userService.user=this._userService.user.filter(user=>user._id!==id)
    this._userService.size=this._userService.user.length

    this.user=this._userService.user
    this.size=this._userService.size

  }

  deleteUser(id:any){
    this._userService.delete(id).subscribe(response=>{
      this.updateUser(id)
    
    },error=>console.log(error))
  }
}
