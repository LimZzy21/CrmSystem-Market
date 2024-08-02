import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskList } from '../models/task-list';
import { Tasks } from '../models/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  constructor(private http:HttpClient) { }

  ulr: string = "http://localhost:3000/taskList"

  getTasks():Observable<TaskList[]>{
    return this.http.get(this.ulr) as Observable<TaskList[]>
  }

  markAsDone(id:string, task:TaskList){
    return this.http.put<TaskList>(`${this.ulr}/${id}`, task )
  }

  addTask(task:TaskList){
    return this.http.post<TaskList>(`${this.ulr}`, task)
  }
}
