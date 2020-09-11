import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../Entities/user';
import { UserAccountDto } from '../Models/user-account-dto.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceBase } from './service-base.service';

const JWT_EXP = 5;
const TIME_REFRESH_JWT = 4 * 10000;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  environment = {
    apiUrl: 'http://localhost:8000',
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private serviceBase: ServiceBase
  ) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
    this.environment.apiUrl = this.serviceBase.getBaseUrl();
  }

  public get userSubscription(): Observable<User> {
    return this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.environment.apiUrl}/api/token/`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          user.username = username;
          localStorage.setItem('access', user.access);
          localStorage.setItem('refresh', user.refresh);
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  logout() {
    // this.http
    //   .post<any>(
    //     `${this.environment.apiUrl}/users/revoke-token`,
    //     {},
    //     { withCredentials: true }
    //   )
    //   .subscribe();
    this.stopRefreshTokenTimer();
    localStorage.clear();
    console.log('logout');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUserByAccess() {
    return this.http.get<any>(`${this.environment.apiUrl}/api/current/`).pipe(
      map((user) => {
        // user.username = username;
        // localStorage.setItem('access', user.access);
        // localStorage.setItem('refresh', user.refresh);
        user.username = user.user.username;
        this.userSubject.next(user);
        console.log('FROM GetCurrentBy Access ==== ' + { user });
        return user;
      })
    );
  }

  refreshToken() {
    let refresh_local;

    if(!this.userValue) {
      refresh_local = localStorage.getItem('refresh');
      if (refresh_local) {
        let newUserLocalRefresh = new User();
        newUserLocalRefresh.refresh = refresh_local;
        this.userSubject.next(newUserLocalRefresh);

        this.getCurrentUserByAccess().subscribe((data) => {
          console.log({ data });
          newUserLocalRefresh.username = data.user.username;
          this.userSubject.next(newUserLocalRefresh);
          this.startRefreshTokenTimer();
        });
      }
    }
    
    return this.http
      .post<any>(`${this.environment.apiUrl}/api/token/refresh/`, {
        refresh: this.userValue.refresh,
      })
      .pipe(
        map((newAcces) => {
          let updatedUser = this.userValue;
          updatedUser.access = newAcces.access;
          this.userSubject.next(updatedUser);
          localStorage.setItem('access', this.userValue.access);
          this.startRefreshTokenTimer();
          console.log("***********************************");
          console.log({UPDATED_USER_IMPORTANT: this.userValue});
          console.log("***********************************");
          return this.userValue;
        })
      );
  }

  // Helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    // for my case I don't use the encoded64, so I need to change this code
    // const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

    // const expires = new Date(JWT_EXP * 10);
    const expires = Date.now();

    // const timeout = expires.getTime() - Date.now() - (60 * 1000);
    const timeout = TIME_REFRESH_JWT;

    const fourMinsLater = new Date();
    fourMinsLater.setMinutes(fourMinsLater.getMinutes() + 1); // 1 = Minutes
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      fourMinsLater.getTime() - Date.now()
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  register(userAccountDto: UserAccountDto) {
    let user = userAccountDto.user;
    let account = userAccountDto.account;
    return this.http
      .post<any>(`${this.environment.apiUrl}/api/register_user/`, {
        user,
        account,
      })
      .pipe(
        map((userAccountDto) => {
          return userAccountDto;
        })
      );
  }
}
