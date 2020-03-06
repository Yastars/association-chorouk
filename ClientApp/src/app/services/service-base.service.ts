import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServiceBase {
  baseUrl = 'http://localhost:8000';

  constructor() {
    this.baseUrl = location.origin.includes('localhost')
      ? 'http://localhost:8000'
      : this.baseUrl;

    this.baseUrl = location.origin.includes('hosting-name')
      ? 'hosting-url:'
      : this.baseUrl;
  }

  getBaseUrl() {
    return this.baseUrl;
  }
}
