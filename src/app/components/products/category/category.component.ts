import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, CommonModule, KeyValuePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Product } from '../../../models/product';
import { HeaderComponent } from '../header/header.component';



@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [RouterLink, NgClass, NgFor, NgIf, AsyncPipe, KeyValuePipe, CommonModule, HttpClientModule, HeaderComponent],
  providers: [ProductService]
})
export class CategoryComponent implements OnInit {
  constructor(private productService: ProductService, private route: ActivatedRoute, private router:Router) { }
  products: Product[] = [];
  category = ''

  
  ngOnInit(): void {
    
    this.route.params.subscribe((params: Params) => {
      this.category = params['category'] || 'monitors';
      this.loadProducts(this.category);
    });

    
  }

  loadProducts(category: string): void {
    this.productService.getItems(category).subscribe({
      next: data => this.products = data
    });

  }

  detailsProduct(id:string = ''){
   
    this.router.navigate([`/shop/${this.category}/${id}`])
  }

  

}
