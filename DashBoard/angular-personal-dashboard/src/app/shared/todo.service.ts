import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos:Todo[]=[new Todo('This is seervice'),new Todo('This is seervice2')]

  constructor() { 
    this.todos[0].completed=true
  }

  getTodos(){
    return this.todos 
  }

  getTodo(id:string){
    return this.todos.find(t=>t.id===id)
  }

  addTodo(todo:Todo){
    this.todos.push(todo)
  }

  updatedTodo(id:string,updatedTodoFileds:Partial<Todo>){

    const todo=this.getTodo(id)

    Object.assign(todo,updatedTodoFileds)

  }


  deleteTodo(id:string){

    const index=this.todos.findIndex(t=>t.id===id)
    if(index==-1) return 

    this.todos.splice(index,1)

  }


}
