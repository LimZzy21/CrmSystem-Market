import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CurrencyPipe, formatDate, NgFor, NgIf } from '@angular/common';
import { Product } from '../../../models/product';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncomeService } from '../../../service/income.service';
import { HttpClientModule } from '@angular/common/http';
import { Income } from '../../../models/income';
import { ProductService } from '../../../service/product.service';
import { OrderService } from '../../../service/order.service';

import { Orders } from '../../../models/orders';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, CurrencyPipe, NgFor, RouterLink,ReactiveFormsModule, NgIf, HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers:[IncomeService, ProductService, OrderService]
})
export class CartComponent implements OnInit {
constructor(private router:Router, private IncomeService:IncomeService, private ProductService:ProductService, private OrderService: OrderService){}
  products:Product[]= []
  sum:number = 0
  isShowModal:boolean = false
  income: Income = {
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0
}
  orders: Orders = { total: 0, success: 0, inProgress: 0, canselled :0}
  ngOnInit(): void {
    let localCart: Product[] | null | string = localStorage.getItem('cart') 
    if(localCart){
      localCart = JSON.parse(localCart) as Product[] 
      this.products = localCart
    }
    this.getSumProducts()


    this.IncomeService.getIncome().subscribe({
      next: (data) => {
        this.income = data  
      }
    })

    this.OrderService.getOrders().subscribe({
      next:data=>this.orders = data
    })
  }

  toDetails(){
    this.router.navigate(['/shop/'])
  }

  removeItem(id: string = '') {
    const index = this.products.findIndex(el => el.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }


    localStorage.setItem('cart', JSON.stringify(this.products));
    this.getSumProducts()
  }

  getSumProducts(){
    this.sum = this.products.reduce((total, item) => total + item.price, 0);
  }

  onSubmitBuy(){
    if(this.buyProducts.valid){
    this.isShowModal = true
    const date = new Date()
    const key = formatDate(date, 'MMM', 'en-US').toLowerCase()
    const objIncome:any = this.income

    for (const el in objIncome) {
      if(el===key ){
        objIncome[key] = objIncome[key] + this.sum
      }
      
      
    }


      this.IncomeService.putIncome(objIncome).subscribe()
      localStorage.removeItem('cart')
      this.orders.total++ 
      this.orders.inProgress++ 
      this.OrderService.saveOrders(this.orders).subscribe()
      const order = {date:formatDate(date, 'dd-MM-yyyy', 'en-US').toLowerCase(), status:'In progress',...this.buyProducts.value, sum:this.sum, ...this.products} 
      this.ProductService.addOrder(order).subscribe()
      this.products = []
      this.sum = 0
      this.buyProducts.reset()
    }

    
  }

  buyProducts: FormGroup = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.min(4)]),
    'address': new FormControl('',[Validators.required]),
    'tel': new FormControl('+38', [Validators.required, Validators.minLength(12)])
  })

}
