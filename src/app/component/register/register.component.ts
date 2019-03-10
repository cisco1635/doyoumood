import { Component, OnInit } from '@angular/core';
import { TokenPayload } from '../../models/token-payload';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    role: 'user'
  };

  ngOnInit() {
  }

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials);
  }

}
