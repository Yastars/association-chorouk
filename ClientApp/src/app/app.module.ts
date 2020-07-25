import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


/* By Yasoo */
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';    // add this


import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { GameListComponent } from './Components/game-list/game-list.component';
import { GameComponent } from './Components/game/game.component';
import { GameRegistrationComponent } from './Components/game-registration/game-registration.component';
import { SinglePostComponent } from './Components/single-post/single-post.component';
import { PostComponent } from './Components/post/post.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { HeaderComponent } from './Components/header/header.component';
import { AboutPageComponent } from './Pages/about-page/about-page.component';
import { BlogPageComponent } from './Pages/blog-page/blog-page.component';
import { SingleBlogPageComponent } from './Pages/single-blog-page/single-blog-page.component';

// FontAwseome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    GameListComponent,
    GameComponent,
    GameRegistrationComponent,
    SinglePostComponent,
    PostComponent,
    DashboardComponent,
    HeaderComponent,
    AboutPageComponent,
    BlogPageComponent,
    SingleBlogPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
