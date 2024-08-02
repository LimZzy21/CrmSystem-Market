import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../models/orders';
import { Order } from '../models/orderList';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient ) { }

  url: string = 'http://localhost:3000/orders'
  
  getOrders():Observable<Orders>{
    return this.http.get(this.url) as Observable<Orders>
  }

  saveOrders(orders:Orders): Observable<Orders> {
    return this.http.put<Orders>(this.url, orders);
  }

 

}
