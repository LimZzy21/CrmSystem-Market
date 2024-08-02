import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { People } from '../models/people';
import { PeopleChart } from '../components/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class PeopleService  {
  constructor(private http: HttpClient) { }
  url: string = 'http://localhost:3000/people'


  getCustomers(): Observable<PeopleChart> {
    return this.http.get(this.url) as Observable<PeopleChart>
  }

  patchCustomers(data:PeopleChart):Observable<PeopleChart>{
    console.log(data)
    
    return this.http.put<PeopleChart>(this.url, data)
  }
 

}
