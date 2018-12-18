import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http:HttpClient) { }
  
  addVote(nb) {
	const uri = 'http://localhost:4000/votes/add';
	
	// get vote for the date
	// increment 1 for nb
    const obj = {
      date: Date.now(),
      nb5: 1
    };
    this.http.post(uri, obj)
        .subscribe(res => console.log('Done'));
  }
}
