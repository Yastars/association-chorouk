import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AboutPageComponent } from './Pages/about-page/about-page.component';
import { BlogPageComponent } from './Pages/blog-page/blog-page.component';
import { SingleBlogPageComponent } from './Pages/single-blog-page/single-blog-page.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'blog/:id', component: BlogPageComponent },
  { path: 'blog/post/:id', component: SingleBlogPageComponent },
  { path: 'blog/:category/:id', component: BlogPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
