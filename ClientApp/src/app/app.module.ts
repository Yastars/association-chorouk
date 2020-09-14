import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


/* By Yasoo */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';    // add this


import { LoginComponent } from './Components/login/login.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationComponent } from './Components/pagination/pagination.component';

// FontAwseome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './services/auth.service';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { appInitializer } from './_helpers/app.initializer';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { RegisterComponent } from './Components/register/register.component';



// Angular Material
import { MaterialModule } from './material.module';
import { GameCardComponent } from './Components/game-list/game-card/game-card.component';
import { JoinGameBtnComponent } from './Components/game-list/join-game-btn/join-game-btn.component';
import { PositionPickerDialogComponent } from './Components/game-list/position-picker-dialog/position-picker-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameListComponent,
    GameComponent,
    GameRegistrationComponent,
    SinglePostComponent,
    PostComponent,
    DashboardComponent,
    HeaderComponent,
    AboutPageComponent,
    BlogPageComponent,
    SingleBlogPageComponent,
    RegisterComponent,
    PaginationComponent,
    GameCardComponent,
    JoinGameBtnComponent,
    PositionPickerDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,    
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
