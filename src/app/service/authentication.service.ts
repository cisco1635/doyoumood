import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { TokenPayload } from '../models/token-payload';
import { TokenResponse } from '../models/token-response';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private token: string;
  private serviceUrl =  "http://localhost:3000" ;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): User {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): any {
    let base;
  
    if (method === 'post') {
      return this.http.post(this.serviceUrl + `/api/${type}`, user).subscribe(
        (data: TokenResponse) => {
          if (data.token) {
            this.saveToken(data.token);
          }
          return data;
        }
      );
    } else {
      return this.http.get(this.serviceUrl + `/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }}).subscribe(
        (data: TokenResponse) => {
          if (data.token) {
            this.saveToken(data.token);
          }
          return data;
        }
      );
    }
  }

  public register(user: TokenPayload): any {
    return this.request('post', 'register', user);
  }
  
  public login(user: TokenPayload): any {
    return this.request('post', 'login', user);
  }
  
  public profile(): any {
    return this.request('get', 'profile');
  }
}
