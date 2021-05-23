import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { UserPostsComponent } from './modules/posts/pages/user-posts/user-posts.component';
import { EditProfileComponent } from './modules/profile/components/edit-profile/edit-profile.component';
import { ListProfileComponent } from './modules/profile/components/list-profile/list-profile.component';
import { ProfileAboutComponent } from './modules/profile/components/profile-about/profile-about.component';
import { ProfileComponent } from './modules/profile/pages/profile/profile.component';
import { LoginComponent } from './modules/users/components/login/login.component';
import { SignupComponent } from './modules/users/components/signup/signup.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:"posts",component:UserPostsComponent},
  {path:"profile",component:ProfileComponent,
  children:
  [
    {path:'',component:ProfileAboutComponent},
    {path:'update',component:EditProfileComponent}
  ]},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
