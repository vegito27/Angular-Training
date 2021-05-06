import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BudgetItem } from '../../../../shared/model/budget-item.model';

@Component({
  selector: 'app-edit-item-model',
  templateUrl: './edit-item-model.component.html',
  styleUrls: ['./edit-item-model.component.scss']
})
export class EditItemModelComponent implements OnInit {

  // @Input() item:BudgetItem

  constructor(public dialogRef:MatDialogRef<EditItemModelComponent>,
    @Inject(MAT_DIALOG_DATA) public item:BudgetItem) { }

  ngOnInit(): void {}

  onSubmitted(updatedItem:BudgetItem){
    this.dialogRef.close(updatedItem)
  }

}
