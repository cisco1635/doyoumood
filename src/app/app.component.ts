import { Component, OnInit } from '@angular/core';
import { VoteService } from './service/vote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Do you mood ?';
}
