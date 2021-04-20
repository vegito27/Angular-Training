import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  showTodoValidationErrors:boolean

  todos:Todo[]

  constructor(private todoService:TodoService,private router:Router) { }


  ngOnInit(): void {
    this.todos=this.todoService.getTodos()
    this.showTodoValidationErrors=false
  }

  onSubmitTodo(form:NgForm){
    if(form.invalid) return this.showTodoValidationErrors=true

    const todo=new Todo(form.value.text)
    this.todoService.addTodo(todo)
    this.router.navigateByUrl('/todos')
  }

}
