import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImprintComponent } from './imprint/imprint.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { LoginComponent } from './login/login.component';
import { Signup1Component } from './signup1/signup1.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'todos',component:TodosComponent},
  {path:'signup',component:Signup1Component},
  {path:'home',component:HomeComponent},
  {path:'imprint',component:ImprintComponent},
  {path:'legalnotice',component:LegalNoticeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
