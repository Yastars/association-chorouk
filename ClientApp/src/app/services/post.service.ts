import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ServiceBase } from './service-base.service';
import { Observable } from 'rxjs';
import { Post } from '../Entities/Post';

export class PostModel {
  id: 28;
  publishedByUsername: string;
  createdAt: string;
  title: string;
  preview: string;
  content: string;
  picture: string;
  category: string;
  publishedBy: number;
  editedBy: number;
}

export interface PostPageModel {
  count: number;
  next: string;
  previous: string;
  results: PostModel[];
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private headers: HttpHeaders;
  private baseUrl: string;

  constructor(private http: HttpClient, private serviceBase: ServiceBase) {
    this.baseUrl = this.serviceBase.getBaseUrl();
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getAllPosts(nbPage: number): Observable<HttpResponse<PostPageModel>> {
    return this.http.get<PostPageModel>(
      // Edit this shit
      this.baseUrl + '/posts/?format=json&page=' + nbPage,
      {
        observe: 'response',
        headers: this.headers
      }
    );
  }

  getOnePost(id: string): Observable<HttpResponse<PostModel>> {
    return this.http.get<PostModel>(
      `${this.baseUrl}/posts/${id}`, {
        observe: 'response',
        headers: this.headers
      }
    )
  }
}
