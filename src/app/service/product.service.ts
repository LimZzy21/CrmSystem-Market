import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Order } from '../models/orderList';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getItems(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}${category}`)
  }

  addItem(item: Product, category:string){
    
      return this.http.post<Product>(`${this.url}${category}`, item)
  }

  getItem(id:string, category:string){
    return this.http.get<Product>(`${this.url}${category}/${id}`)
  }

  addOrder(products:Product[]){
   return this.http.post<Product[]>(`${this.url}orderList`, products) 
  }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(`${this.url}orderList`)
  }

  markSuccsessOrder(id:string):Observable<Order[]>{
    return this.http.patch<Order[]>(`${this.url}orderList/${id}`, {status:'Succsess'})
  }


  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.url}orderList/${id}`)
  } 

  removeItem(id:string):Observable<Order>{
    return this.http.delete<Order>(`${this.url}orderList/${id}`)
  }
  
updateOrder(order:Order):Observable<Order>{
  return this.http.patch<Order>(`${this.url}orderList/${order.id}`, order)
}

}
