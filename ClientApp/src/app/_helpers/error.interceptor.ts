import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService} from '../services/auth.service';



// The Error Interceptor intercepts http responses from the api to check if there were any errors. If the response is 401 Unauthorized or 403 Forbidden the user is automatically logged out of the application, all other errors are logged to the console and re-thrown up to the calling service so an alert with the error can be displayed in the UI.
// Http interceptors are added to the request pipeline in the providers section of the app.module.ts file.

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError( err => {
                if ([401, 403].includes(err.status) && this.authService.userValue) {
                    this.authService.logout();
                }

                const error = (err && err.error && err.error.message) || err.statusText;
                console.error(err);
                return throwError(error);
            })
        )
    }


}