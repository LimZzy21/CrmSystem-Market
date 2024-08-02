import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks } from '../models/tasks';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/tasks'

    getTasks():Observable<Tasks>{
      return this.http.get(this.url) as Observable<Tasks>
    }

    addTaskCounter(details:Tasks):Observable<Tasks>{
      return this.http.put(this.url,  details) as Observable<Tasks>
    }
   
}
