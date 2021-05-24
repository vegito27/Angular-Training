import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profiles/profile.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.css']
})
export class ProfileAboutComponent implements OnInit {

  constructor(private _profileservice:ProfileService,private _userservice:UserService) { }

  profile:any
  id:any
 

  ngOnInit(): void {
  	//  this.id=this._userservice.getUserData()

  	// this._profileservice.getProfile(this.id).subscribe(res=>{
  	// 	this.profile=res
  	// 	console.log(this.profile)

  	// })


  }

}
