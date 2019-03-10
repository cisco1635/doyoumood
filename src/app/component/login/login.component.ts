import { Component, OnInit } from '@angular/core';
import { TokenPayload } from '../../models/token-payload';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    credentials: TokenPayload = {
      email: '',
      password: '',
      role:''
    };

    ngOnInit() {
    }
  
    constructor(private auth: AuthenticationService, private router: Router) {}
  
    login() {
      this.auth.login(this.credentials);
    }

}
