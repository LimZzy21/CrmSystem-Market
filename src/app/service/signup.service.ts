import { Injectable } from '@angular/core';
import { SignUp } from '../models/signup';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http:HttpClient) { }

  ulr: string = 'http://localhost:3000/users'

  createUser(user:SignUp):Observable<SignUp[]>{
    return this.http.post<SignUp[]>(this.ulr, user) 
  }

  getUser(id:string):Observable<Customer>{
    return this.http.get<Customer>(`${this.ulr}/${id}`)
  }

  editUser(user:Customer, id:string):Observable<Customer>{
    return this.http.patch<Customer>(`${this.ulr}/${id}`, user)
  }


}
