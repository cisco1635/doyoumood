import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule, MatSnackBar } from '@angular/material';

import { VoteService } from '../../service/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  constructor(private voteservice: VoteService, public snackBar : MatSnackBar) { }

  ngOnInit() {
    
  }

  addVote(nb) {
    this.voteservice.addVote(nb);
    this.openSnackBar(5-nb);
  }

  openSnackBar(vote: number) {
    var labels = ["Overjoyed", "Happy", "Neutral", "Annoyed", "Angry"];
    this.snackBar.open('Your mood \'' + labels[vote] + '\' was registered !','OK', 
    {
      duration: 2000,
    });
  }
}
