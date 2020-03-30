import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServiceBase {
  baseUrl = 'chorouk-app.herokuapp.com';

  constructor() {
    this.baseUrl = location.origin.includes('localhost')
      ? 'http://localhost:8000'
      : this.baseUrl;

    this.baseUrl = location.origin.includes('chorouk')
      ? 'chorouk-app.herokuapp.com'
      : this.baseUrl;

    if (location.origin.includes('chorouk')){
      console.log('PRODUCTION ENVIRONMENT');
    }
  }

  getBaseUrl() {
    return this.baseUrl;
  }
}
