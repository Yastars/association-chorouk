import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


import { AuthService } from '../services/auth.service';
import { ServiceBase } from '../services/service-base.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    environment = {
        apiUrl: 'http://localhost:8000'
    };
    constructor (private authService: AuthService, private serviceBase: ServiceBase) { 
        this.environment.apiUrl = this.serviceBase.getBaseUrl();
    }

    
    // follow this https://jasonwatmore.com/post/2020/07/25/angular-10-jwt-authentication-with-refresh-tokens#app-module-ts
    // start from User Service
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url

        const user = this.authService.userValue;
        const isLoggedIn = user && user.access;
        const isApiUrl = request.url.startsWith(this.environment.apiUrl);

        if(isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.access}`}
            });
        }
        return next.handle(request);
    }
}