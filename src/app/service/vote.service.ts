import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http:HttpClient) { }
  
  addVote(nb) {
    const uri = 'http://localhost:3000/api/votes/' + nb;
    var obj = nb;
    this.http.post(uri, {})
             .subscribe(res => console.log('Done'));
  }
}
