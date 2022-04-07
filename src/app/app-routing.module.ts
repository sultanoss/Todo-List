import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Signup1Component } from './signup1/signup1.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'todos',component:TodosComponent},
  {path:'signup',component:Signup1Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
