import { Component, OnInit,Input,Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { BudgetItem } from "../../../../shared/model/budget-item.model";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  isNewItem:boolean

  @Input() item:BudgetItem=new BudgetItem('',null);
  @Output() formSubmit:EventEmitter<BudgetItem>=new EventEmitter<BudgetItem>()

  constructor() { }

  ngOnInit(): void {
    if(this.item){
      this.isNewItem=false

    }else{
      this.isNewItem=true
      this.item=new BudgetItem('',null)
    }
  }

  onSubmit(form:NgForm){
    this.formSubmit.emit(form.value)
    form.reset()
  }

}
