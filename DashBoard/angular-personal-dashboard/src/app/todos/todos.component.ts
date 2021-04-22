import { style ,trigger,transition,animate} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations:[
    trigger('todoItemAnim',[
      transition(':leave',[
        animate(200,style({
          opacity:0,
          height:0,
          marginBottom:0
        }))
      ])
    ])
  ]
})
export class TodosComponent implements OnInit {


// array to capture todos 
  todos:Todo[]
// assigning service Class variable in constructor
  constructor(private todoService:TodoService,private router:Router   ) { }


// With constructor variable we are trying to access the todo services
  ngOnInit(): void {
    this.todos=this.todoService.getTodos()
  }

  toggleCompleted(todo:Todo){
    this.todoService.updatedTodo(todo.id,{completed:!todo.completed})

  }

  onEditClick(todo:Todo){
    this.router.navigate(['/todos',todo.id])
    // alert("Hey I m in the todos component")
  }

  onDeleteClick(todo:Todo){
    this.todoService.deleteTodo(todo.id) 
  }

  trackById(index,item:Todo){
    return item.id 

  }

}
