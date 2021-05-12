import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { NotLoggedInComponent } from './shared/pages/not-logged-in/not-logged-in.component';
import { HeaderListComponent } from './shared/components/header-list/header-list.component';
import { SidebarListComponent } from './shared/components/sidebar-list/sidebar-list.component';
import { SignupComponent } from './modules/users/components/signup/signup.component';
import { LoginComponent } from './modules/users/components/login/login.component';
import { CreatePostComponent } from './modules/posts/components/create-post/create-post.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CardsComponent } from './modules/dashboard/components/cards/cards.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { UserslistComponent } from './modules/dashboard/components/userslist/userslist.component';
import { GraphComponent } from './modules/dashboard/components/graph/graph.component';
import { LinksComponent } from './modules/dashboard/components/links/links.component';
import { NoDataFoundComponent } from './modules/dashboard/pages/no-data-found/no-data-found.component';
import { BreadcrumbComponent } from './modules/dashboard/components/breadcrumb/breadcrumb.component';
import { PagiationComponent } from './modules/dashboard/components/pagiation/pagiation.component';
import { CardComponent } from './modules/dashboard/components/card/card.component';
import { TableComponent } from './modules/dashboard/components/table/table.component';
import { BarChartComponent } from './modules/dashboard/components/bar-chart/bar-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { SidebarOpenDirective } from './directives/sidebar-open.directive'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
    NotLoggedInComponent,
    HeaderListComponent,
    SidebarListComponent,
    SignupComponent,
    LoginComponent,
    CreatePostComponent,
    CardsComponent,
    DashboardComponent,
    UserslistComponent,
    GraphComponent,
    LinksComponent,
    NoDataFoundComponent,
    BreadcrumbComponent,
    PagiationComponent,
    CardComponent,
    TableComponent,
    BarChartComponent,
    // SidebarOpenDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
