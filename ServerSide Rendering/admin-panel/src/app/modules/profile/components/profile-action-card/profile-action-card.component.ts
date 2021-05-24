import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profiles/profile.service';
import { UserService } from 'src/app/services/user/user.service';
import { ProfileComponent } from '../../pages/profile/profile.component';

@Component({
  selector: 'app-profile-action-card',
  templateUrl: './profile-action-card.component.html',
  styleUrls: ['./profile-action-card.component.css']
})
export class ProfileActionCardComponent implements OnInit {

  update:any

  profile={
    userName:'',
    profile:'@User',
    aboutMe:'This is the profile representing me....'
  }

  validatingForm: FormGroup;

  get modalFormAvatarPassword() {
    return this.validatingForm.get('modalFormAvatarPassword');
  }

   constructor(private profileservice:ProfileService,private _userservice:UserService) {

    let data=JSON.parse(this._userservice.getUserData())
    this.profile.userName=data.userName
    console.log(data.userName)  


    this.profileservice.getProfile(data.id).subscribe(res=>{
      console.log(res)
    })
  }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      modalFormAvatarPassword: new FormControl('', Validators.required)
    });
  }

  
  updateProfile(){
  }


}
