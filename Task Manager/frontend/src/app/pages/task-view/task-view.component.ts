import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];

  selectedListId: string;

  constructor(
    private taskservice:TaskService,
    private route:ActivatedRoute,
    private router: Router
  )  { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
          this.taskservice.getTasks(params.listId).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

  
    this.taskservice.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    })
  }

  createNewList(){
    this.taskservice.createList('Testing').subscribe((response:any)=>{
      console.log(response)
    })
  }

}
