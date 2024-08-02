import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../components/products/navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:3000/category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories> {
    
    return this.http.get<Categories>(this.apiUrl);
  }
}
