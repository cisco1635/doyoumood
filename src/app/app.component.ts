import { Component, OnInit } from '@angular/core';
import { VoteService } from './vote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'niko2API';
  constructor(private voteservice : VoteService) {
  }
  
  addVote(nb) {
	this.voteservice.addVote(nb);
  }
}
