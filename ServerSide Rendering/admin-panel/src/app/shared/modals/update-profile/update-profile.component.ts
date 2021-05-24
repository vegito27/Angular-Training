import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor() { }

  validatingForm: FormGroup;

  ngOnInit() {
    this.validatingForm = new FormGroup({
      modalFormAvatarPassword: new FormControl('', Validators.required)
    });
  }

  get modalFormAvatarPassword() {
    return this.validatingForm.get('modalFormAvatarPassword');
  }

}
