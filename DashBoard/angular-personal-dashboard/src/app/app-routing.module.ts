import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { EditBookmarkComponent } from './edit-bookmark/edit-bookmark.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { ManageBookmarkComponent } from './manage-bookmark/manage-bookmark.component';
import { NotesComponent } from './notes/notes.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {path:'bookmarks',component:BookmarksComponent,data:{tab:1}},
  {path:'bookmarks/add-bookmark',component:AddBookmarkComponent},
  {path:'bookmarks/manage',component:ManageBookmarkComponent,children:[
    {path:':id',component:EditBookmarkComponent}
  ]},
 
  {path:'todos',component:TodosComponent,data:{tab:2}},
  {path:'todos/add-todo',component:AddTodoComponent},
  {path:'todos/:id',component:EditTodoComponent},
  {path:'notes',component:NotesComponent,data:{tab:3}},
  {path:'notes/add-note',component:AddNoteComponent},
  {path:'notes/:id',component:EditNoteComponent}

] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
