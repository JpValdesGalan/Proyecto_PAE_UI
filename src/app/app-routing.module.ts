import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginSuccesComponent } from './pages/login-succes/login-succes.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForumComponent } from "./pages/forum/forum.component";
import { NewForumComponent } from "./pages/new-forum/new-forum.component";
import { PostComponent } from "./pages/post/post.component";
import { NewPostComponent } from "./pages/new-post/new-post.component";
import { UserComponent } from "./pages/user/user.component";

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'loginSucces', component: LoginSuccesComponent, canActivate: [AuthGuard] },
  { path: 'forum/:id', component: ForumComponent},
  { path: 'new-forum', component: NewForumComponent, canActivate: [AuthGuard]},
  { path: 'post/:id', component: PostComponent},
  { path: 'new-post/:id', component: NewPostComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
