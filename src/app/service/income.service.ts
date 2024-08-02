import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Income } from '../models/income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/income'

  getIncome(){
    return this.http.get<Income>(this.url) 
  }

  putIncome(income: Income){
    return this.http.put(this.url, income)
  }
}
