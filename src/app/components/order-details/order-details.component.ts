import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Order, OrderItem } from '../../models/orderList';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [HttpClientModule,NgFor,NgIf, KeyValuePipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
  providers: [ProductService]
})
export class OrderDetailsComponent implements OnInit {
  constructor(private ProductService: ProductService, private route: ActivatedRoute) { }

  order: Order = { id: '', name: '', address: '', status: '', sum: 0, tel: '',date:'' }
  id: string = this.route.snapshot.params['id'];

  isOrderItem(item: any): item is OrderItem {
    return (item as OrderItem).title !== undefined;
  }

  ngOnInit(): void {
    this.ProductService.getOrder(this.id).subscribe({
      next: data => {
        this.order = data
        console.log(this.order);
        
      }
    })
  }


}
