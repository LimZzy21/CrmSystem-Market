import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import {  HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css',
  providers: [ProductService]
})
export class DetailsProductComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private ProductService: ProductService
  ) { }
  productId: any = ''
  product: any
  productCategory:string|null= ''

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id')
      this.productCategory = params.get('category')
      if(this.productCategory){
      this.ProductService.getItem(this.productId, this.productCategory).subscribe({
        next: data => this.product = data
      })
      }
    });

  }

  addToCart() {
    let localCart = localStorage.getItem('cart');
    
    if (localCart) {
      let cartArray = JSON.parse(localCart)

      if (Array.isArray(cartArray)) {
        cartArray.push({...this.product, category:this.productCategory});
      } else {
        cartArray = [{ ...this.product, category: this.productCategory }];
      }

      localStorage.setItem('cart', JSON.stringify(cartArray));
    } else {
      localStorage.setItem('cart', JSON.stringify([{ ...this.product, category: this.productCategory }]));
    }
  }


}
