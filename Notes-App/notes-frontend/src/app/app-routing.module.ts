import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NoteDetailComponent } from './pages/note-detail/note-detail.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';

const routes: Routes = [{
  path:'',component:MainLayoutComponent,
  children:[
    {path:'',component:NotesListComponent },
    {path:':id',component:NoteDetailComponent}]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

