import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AboutPageComponent } from './Pages/about-page/about-page.component';
import { BlogPageComponent } from './Pages/blog-page/blog-page.component';
import { SingleBlogPageComponent } from './Pages/single-blog-page/single-blog-page.component';

import { AuthGuard } from './_helpers/auth.guard';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'blog/:id', component: BlogPageComponent },
  { path: 'blog/post/:id', component: SingleBlogPageComponent },
  { path: 'blog/:category/:id', component: BlogPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
