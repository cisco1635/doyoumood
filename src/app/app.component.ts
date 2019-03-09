import { Component, OnInit } from '@angular/core';
import { VoteService } from './service/vote.service';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public auth: AuthenticationService) {}
  
  title = 'Do you mood ?';
}
