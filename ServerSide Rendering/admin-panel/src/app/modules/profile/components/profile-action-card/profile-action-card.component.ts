import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profiles/profile.service';
import { ProfileComponent } from '../../pages/profile/profile.component';

@Component({
  selector: 'app-profile-action-card',
  templateUrl: './profile-action-card.component.html',
  styleUrls: ['./profile-action-card.component.css']
})
export class ProfileActionCardComponent implements OnInit {

  update:any


   constructor(private profileservice:ProfileService) {
    this.profileservice.SharingData.subscribe(data=>{
      this.update=data
    })
   }

  ngOnInit(): void {
  }


  updateProfile(){



  }


}
