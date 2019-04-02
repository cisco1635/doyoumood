import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vote } from '../models/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http:HttpClient) { }
  
  addVote(vote : Vote) {
    const uri = 'http://localhost:3000/api/votes/';
    console.log(vote);
    this.http.post(uri, vote)
             .subscribe(res => console.log('Done'));
  }
}
