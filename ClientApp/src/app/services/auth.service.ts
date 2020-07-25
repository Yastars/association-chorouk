import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { User } from '../Entities/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    environment = {
        apiUrl: 'http://localhost:8000'
    };

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.environment.apiUrl}/users/authenticate`, {username, password}, { withCredentials: true}).pipe(map(user => {
            this.userSubject.next(user);
            this.startRefreshTokenTimer();
            return user;
        }));
    }

    logout() {
        this.http.post<any>(`${this.environment.apiUrl}/users/revoke-token`, {}, {withCredentials: true}).subscribe();
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    refreshToken() {
        return this.http.post<any>(`${this.environment.apiUrl}/users/refresh-token`, {}, { withCredentials: true })
            .pipe(map((user) => {
                this.userSubject.next(user);
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    // Helper methods

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        // for my case I don't use the encoded64, so I need to change this code
        const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}