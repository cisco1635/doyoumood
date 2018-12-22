import { Component, OnInit } from '@angular/core';

import { VoteService } from '../../service/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  constructor(private voteservice : VoteService) {  }

  ngOnInit() {
  }


  
  addVote(nb) {
	this.voteservice.addVote(nb);
  }
}
