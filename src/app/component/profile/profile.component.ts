import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user: User;

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {

    this.user = this.auth.getUserDetails();

  }




}
