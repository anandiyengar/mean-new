import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { PostsComponent } from './components/pages/posts/posts.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { TopComponent } from './components/layout/top/top.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SinglePostComponent } from './components/pages/single-post/single-post.component';
import { PostAddComponent } from './components/page/post-add/post-add.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyPostComponent } from './components/page/my-post/my-post.component';
import { EditPageComponent } from './components/page/edit-page/edit-page.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostsComponent,
    PageNotFoundComponent,
    TopComponent,
    SinglePostComponent,
    PostAddComponent,
    MyPostComponent,
    EditPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
