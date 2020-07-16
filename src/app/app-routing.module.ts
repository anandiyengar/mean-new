import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { SinglePostComponent } from './components/pages/single-post/single-post.component';
import { PostAddComponent } from './components/page/post-add/post-add.component';
import { MyPostComponent } from './components/page/my-post/my-post.component';
import { EditPageComponent } from './components/page/edit-page/edit-page.component';


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },{
    path:'post/:id',
    component:SinglePostComponent,
    canActivate:[AuthGuard]
  },{
    path:'create/post',
    component:PostAddComponent,
    canActivate:[AuthGuard]
  },{
    path:'myposts',
    component:MyPostComponent,
    canActivate:[AuthGuard]
  },{
    path:'edit-post/:id',
    component:EditPageComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
