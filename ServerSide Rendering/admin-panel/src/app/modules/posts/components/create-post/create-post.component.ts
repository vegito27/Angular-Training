import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor() { }

  optionsSelect: Array<any>;
  disabled: boolean = true;
  disOptionsSelect: Array<any>;

    ngOnInit() {
      this.optionsSelect = [
        { value: '1', label: 'Option 1' } ,
        { value: '2', label: 'Option 2' } ,
        { value: '3', label: 'Option 3' } ,
      ];
      this.disOptionsSelect = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' } ,
        { value: '3', label: 'Disabled option', disabled: true } ,
      ];
    }



}
