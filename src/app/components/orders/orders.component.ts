import { CurrencyPipe, KeyValuePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Order, OrderItem } from '../../models/orderList';
import { OrderService } from '../../service/order.service';
import { Orders } from '../../models/orders';
import { Router, RouterLink } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination'



@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgFor, HttpClientModule, NgIf, CurrencyPipe, KeyValuePipe, RouterLink, NgClass, NgxPaginationModule ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  providers: [ProductService, OrderService]
})
export class OrdersComponent implements OnInit {

  orderList: Order[] = []
  orders: Orders = { total: 0, success: 0, inProgress: 0 ,canselled:0}

  p:any
  constructor(private productService: ProductService, private OrderService: OrderService, private router: Router) { }

  ngOnInit(): void {

    this.productService.getOrders().subscribe({
      next: (data: Order[]) => {
        this.orderList = data;
      }
    });

    this.OrderService.getOrders().subscribe({
      next: data => this.orders = data
    })

  }
  isOrderItem(item: any): item is OrderItem {
    return (item as OrderItem).title !== undefined;
  }

  removeOrder(id: string) {
    this.orderList = this.orderList.filter(el => el.id != id)
    this.productService.removeItem(id).subscribe({})
  }

  editOrder(id:string){
this.router.navigate([`/auth/order-edit/${id}`])
  }

  changeStatus(id: string) {


    this.orderList.filter(el => {
      if (el.id === id && el.status != 'Succsess') {
        this.productService.markSuccsessOrder(id).subscribe()
        this.orders.inProgress--
        this.orders.success++
        this.OrderService.saveOrders(this.orders).subscribe()
        return el.status = 'Succsess'
      }
      return el
    })
    

  }

  detailsOrder(id: string) {
    this.router.navigate([`/auth/order-details/${id}`])
  }
}
