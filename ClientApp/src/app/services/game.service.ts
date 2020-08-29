import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceBase } from './service-base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Entities/user';
import { Game, GamePage } from '../Entities/Game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private headers: HttpHeaders;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  environment = {
    apiUrl: 'http://localhost:8000',
  };

  constructor(private http: HttpClient, private serviceBase: ServiceBase) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
    this.environment.apiUrl = this.serviceBase.getBaseUrl();
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getGames(nbPage: number) {
    const requestPath =
      this.environment.apiUrl + `/api/games/?format=json&page=${nbPage}`;

    return this.http.get<GamePage>(
      // Edit this shit
      requestPath,
      {
        observe: 'response',
        headers: this.headers,
      }
    );
  }
}
