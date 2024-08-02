import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsComponent } from '../products/products/products.component';
import { ProductService } from '../../service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { KeyValuePipe, Location, NgClass, NgFor, NgIf } from '@angular/common';
import { OrderItem } from '../../models/orderList';
import { OrderService } from '../../service/order.service';
import { Orders } from '../../models/orders';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgFor,KeyValuePipe,NgIf],
  providers: [ProductService, OrderService]
})
export class EditOrderComponent implements OnInit {
  editOrderForm: FormGroup;
  order: any
  ordersStat:Orders = {total:0,success:0,inProgress:0, canselled:0}
  canselled: number = 0
  id: string = this.route.snapshot.params['id']
  constructor(private fb: FormBuilder, private ProductService: ProductService, private route: ActivatedRoute, private location:Location, private OrderService: OrderService) {
    this.editOrderForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      date: ['', Validators.required],
      sum: [0, [Validators.required]],
      address: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.ProductService.getOrder(this.id).subscribe({
      next: data => {
        this.order = data
        console.log(this.order);
        
        
        this.editOrderForm.patchValue({
          id: this.order.id,
          date: this.order.date,
          sum: this.order.sum,
          address: this.order.address,
          status: this.order.status
        });
      }
    })
    this.OrderService.getOrders().subscribe({
      next:data=>this.ordersStat = data
    })
  }



  onSubmit() {
    if (this.editOrderForm.valid) {
      const order = { ...this.order, ...this.editOrderForm.value, sum: parseFloat(this.editOrderForm.value.sum) }     
      this.ProductService.updateOrder(order).subscribe()
      this.location.back()
    }

    if (this.editOrderForm.value.status == 'Cancelled' ){
      const orderStat = this.ordersStat
      orderStat.canselled++
      this.OrderService.saveOrders(orderStat).subscribe()
    }

  }
}
