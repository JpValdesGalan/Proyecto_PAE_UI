import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from "@angular/material/card";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginSuccesComponent } from './pages/login-succes/login-succes.component';
import { ForumComponent } from './pages/forum/forum.component';
import { NewForumComponent } from './pages/new-forum/new-forum.component';
import { PostComponent } from './pages/post/post.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { OnCreate } from './shared/directives/on-create.directive';

import { AuthGuard } from './shared/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LoginSuccesComponent,
    ForumComponent,
    NewForumComponent,
    PostComponent,
    NewPostComponent,
    OnCreate,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
