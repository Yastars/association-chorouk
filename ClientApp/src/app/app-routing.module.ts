import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';


const routes: Routes = [

  { path: '', component: DashboardComponent },
  { path: '/about', component: DashboardComponent },
  { path: '/blog', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
