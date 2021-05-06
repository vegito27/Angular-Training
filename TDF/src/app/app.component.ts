import { Component } from '@angular/core';
import { EnrolmentService } from './enrolment.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TDF';
  topics:string[]=['Angular','Vue','React'];
  topicHasError=true;
  submitted=false
  errorMsg=""

  userModel=new User('Rob','rob@test.com',7838195205,'','morning',true);

  constructor(private _enrolmentService:EnrolmentService){}

  validateTopic(value){

      if(value==='default'){
        this.topicHasError=true
      }else {
        this.topicHasError=false
      }
    }

    onSubmit(userForm){
      
      this.submitted=true
      // return this._enrolmentService.enroll(this.userModel).subscribe(
      //   data=>console.log('Success',data),
      //   error=>this.errorMsg=error.statusText
      // )
    }

}
