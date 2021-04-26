import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgRedux,NgReduxModule} from '@angular-redux/store';
import {IAppState,rootReducer,INITIAL_STATE } from './redux/store'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoOverviewComponent } from './todo-overview/todo-overview.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    TodoOverviewComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Configure with store

  constructor(ngRedux:NgRedux<IAppState>){
    ngRedux.configureStore(rootReducer,INITIAL_STATE)
  }
 }
