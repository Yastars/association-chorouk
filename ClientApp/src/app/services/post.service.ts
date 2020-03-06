import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { List } from 'immutable';
import { Post } from '../Entities/Post';
import { ServiceBase } from './service-base.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private headers: HttpHeaders;
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private serviceBase: ServiceBase
  ) {
    this.baseUrl = this.serviceBase.getBaseUrl();
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getPostsList() {
    return this.http.get(
      // Edit this shit
      this.baseUrl + '/posts/?format=json', { headers: this.headers }
      );
  }
}
