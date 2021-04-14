import { Component } from '@angular/core';
import { BudgetItem } from '../../../shared/model/budget-item.model';
import { UpdateEvent } from './budget-item-list/budget-item-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budget-app';

  budgetItems:BudgetItem[]=new Array<BudgetItem>();

  totalBudget:number=0

  addItem(newItem:BudgetItem ){
    this.budgetItems.push(newItem);
    this.totalBudget+=newItem.amount

  }

  deleteItem(item:BudgetItem){
    console.log("delete called")
    let index=this.budgetItems.indexOf(item)
    this.budgetItems.splice(index,1)
    this.totalBudget-=item.amount
  }


  updateItem(updateEvent:UpdateEvent){

      // replace the item with updated values of the form

      this.budgetItems[this.budgetItems.indexOf(updateEvent.old)]=updateEvent.new

      this.totalBudget-=updateEvent.old.amount

      this.totalBudget+=updateEvent.new.amount

  }

}
