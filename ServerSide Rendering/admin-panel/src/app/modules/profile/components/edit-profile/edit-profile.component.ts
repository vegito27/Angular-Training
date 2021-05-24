import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profiles/profile.service';
import { UserService } from 'src/app/services/user/user.service';

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
  stateArray:any
  cityArray:any
  districtArray:any

  statesArr:string[]=[]
  citiesArr:string[]=[]
  districtArr:string[]=[]

  districts:any
  response:any
  cities:any
  // City Names
  // City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  // cityName

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

 get district(){
  return this.addressLine.get('district')
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

  constructor(private fb:FormBuilder,private profileservice:ProfileService,private _userservice:UserService,private _http:HttpClient) {
    this._http.get('../../../../../assets/district.json').subscribe(res=>{

      this.districts=Object.values(res)

      console.log(this.districts)

    })

    this._http.get('../../../../../assets/states.json').subscribe(res=>{ 
      this.response=res
      
      let states=Object.keys(this.response)
       this.cities=Object.values(this.response)

      states.forEach(state=>{
        this.statesArr.push(state)
      })

    })
   }

  ngOnInit(): void {

    this.editProfileForm=this.fb.group({
      firstName:[''],
      lastName:[''],
      gender:[''],
      DOB:[''],
      aboutMe:[''],
      addressLine:this.fb.group({
        address:[''],
        district:[''],
        state:[''],
        city:[''],
        zip:['',Validators.minLength(6)]
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
    let user=JSON.parse(this._userservice.getUserData())

    console.log(user)


    // creates profile
    // this.profileservice.updateProfile(this.editProfileForm.value,user._id).subscribe(data=>{
    //   console.log(data)
    // })

    



  }

  changeCity(e) {
    let indexOfState=Number(e.target.value.split(':')[0])
    this.statesArr.forEach((data,index)=>{
      if(index===indexOfState){
       this.citiesArr=this.cities[indexOfState-1]

       this.districtArr=this.districts[0][index-1].districts

       console.log(this.districtArr)
       console.log(this.statesArr)

       console.log(this.districtArr)
      }
    })

  }

}
