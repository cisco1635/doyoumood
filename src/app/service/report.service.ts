import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }
  
  getData(date1, date2) {
    const uri = 'http://localhost:3000/api/report/' + date1 + '/' + date2;
    return this.http.get(uri, {});
  }
}
