import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TodosComponent } from './todos/todos.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { FirebaseApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { Signup1Component } from './signup1/signup1.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ImprintComponent } from './imprint/imprint.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TodosComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    Signup1Component,
    EditDialogComponent,
    ImprintComponent,
    LegalNoticeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    HotToastModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
