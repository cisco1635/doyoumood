import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class UserService {


  private serviceUrl =  "http://localhost:3000" ;

  constructor(private http: HttpClient, private router: Router) { }

  getUsers() {
    return this.http.get(this.serviceUrl + '/api/users');
  }
  
}
