import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogIn } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }

  url: string = 'http://localhost:3000/users'

  onLogin():Observable<any>{
    return this.http.get(this.url) as Observable <LogIn>
  }

}
