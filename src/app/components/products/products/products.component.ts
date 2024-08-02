import { Component } from '@angular/core';
import { NavbarComponentCategory } from '../navbar/navbar.component';
import { CategoryService } from '../../../service/category.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from "../category/category.component";
import { Router, RouterOutlet } from '@angular/router';
import { ContentProductsComponent } from '../content-products/content-products.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponentCategory, CategoryComponent, HttpClientModule,ContentProductsComponent,RouterOutlet ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [CategoryService]
})
export class ProductsComponent
 {

  selectedCategoryItem: any = 'matgfd';
}
