import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule, MatSnackBar } from '@angular/material';

import { VoteService } from '../../service/vote.service';
import { Vote } from '../../models/vote';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  constructor(private voteservice: VoteService, public snackBar : MatSnackBar) { }
  
  chosenMood : number;
  vote : Vote;
  labels = ["Overjoyed", "Happy", "Neutral", "Annoyed", "Angry"];

  ngOnInit() {
    this.vote = new Vote();
  }

  chooseMood(nb) {
    this.chosenMood = nb;
  }

  addVote() {
    this.vote.nb = this.labels[5 - this.chosenMood];
    this.voteservice.addVote(this.vote);
    this.openSnackBar(5-this.chosenMood);
    this.chosenMood = 0;
    this.vote.comment=null;
  }

  openSnackBar(vote: number) {
    this.snackBar.open('Your mood \'' + this.labels[vote] + '\' was registered !','OK', 
    {
      duration: 2000,
    });
  }
}
