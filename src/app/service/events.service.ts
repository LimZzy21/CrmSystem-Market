import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http:HttpClient) { }

  url: string = 'http://localhost:3000/events'

  getEvents(): Observable<Event>{
    return this.http.get(this.url) as Observable<Event>
  }

  updateEvent(event:any):Observable<Event>{
     return this.http.post(this.url, event ) as Observable<Event>
  }

}
