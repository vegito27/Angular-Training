import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/services/profiles/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editProfileForm:FormGroup
  addressLine:FormGroup
  companyInfo:FormGroup
  social:FormGroup

  get firstName(){
    return this.editProfileForm.get('firstName')
  }
  
  get lastName(){
    return this.editProfileForm.get('lastName')
  }

  get gender(){
    return this.editProfileForm.get('gender')
  }

  get DOB(){
    return this.editProfileForm.get('DOB')
  }

  get aboutMe(){
    return this.editProfileForm.get('aboutMe')
  }

 get address(){
   return this.addressLine.get('address')
 }

 get state(){
   return this.addressLine.get('state')
 }

 get city(){
   return this.addressLine.get('city')
 }

 get zip(){
   return this.addressLine.get('zip')
 }

 get companyName(){
   return this.companyInfo.get('companyName')
 }

 get webSite(){
   return this.companyInfo.get('webSite')
 }

 get github(){
   return this.social.get('github')
 }

 get linkedin(){
   return this.social.get('linkedin')
 }


  constructor(private fb:FormBuilder,private profileservice:ProfileService,private _userservice:UserService) { }

  ngOnInit(): void {

    this.editProfileForm=this.fb.group({
      firstName:[''],
      lastName:[''],
      gender:[''],
      DOB:[''],
      aboutMe:[''],
      addressLine:this.fb.group({
        address:[''],
        country:[''],
        state:[''],
        city:[''],
        zip:['']
      }),
      companyInfo:this.fb.group({
        companyName:[''],
        webSite:[''],
      }),
      social:this.fb.group({
        github:[''],
        linkedin:['']
      })
    })
  }


  onSubmit(){
    // this will create profile
    this.profileservice.updateProfile(this.editProfileForm.value,this._userservice.getUserId()).subscribe(data=>{
      console.log(data)
    })
  

  }

}
