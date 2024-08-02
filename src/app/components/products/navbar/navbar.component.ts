import { KeyValuePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../service/category.service';
import { HttpClientModule } from '@angular/common/http';
import { SignUp } from '../../../models/signup';

export interface Categories{
  [key: string]: string[];
}

@Component({
  selector: 'app-navbar-category',
  standalone: true,
  imports: [RouterLink,NgClass, NgFor,NgClass, KeyValuePipe, NgIf, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers:[CategoryService]
})
export class NavbarComponentCategory {
  constructor(private CategoryService: CategoryService,
    private router: Router,
  ) { }
  categories: Categories = {};
  categoryOrder: string[] = ['pc', 'electronic', 'home', 'tools', 'plumbing', 'dacha'];
  selectedCategory:string|null = ''

  isAdmin: boolean = false
  isEmployee:boolean = false

  @Input() selectedCategoryItem: string | null = 'pc';

  ngOnInit(): void {

    let localUser: SignUp | string | null = localStorage.getItem('user')

    if(localUser){
      localUser = JSON.parse(localUser) as SignUp
        this.isAdmin = localUser.isAdmin
        this.isEmployee = localUser.isEmployee
    }

    this.CategoryService.getCategories().subscribe({
      next: data => this.categories = data
    })
  
  }

  selectCategory(category: string): void {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }
    
  }

  onRouteToCategory(category:string){
    this.router.navigate([`shop/products/${category.toLowerCase().split(' ').join('')}`])
  }



  getCategoryIcon(category: string): string {
    switch (category) {
      case 'pc': return 'bi-pc-display';
      case 'electronic': return 'bi-phone';
      case 'home': return 'bi-house';
      case 'tools': return 'bi-tools';
      case 'plumbing': return 'bi-box-seam';
      case 'dacha': return 'bi-house-add';
      default: return '';
    }
  }
}
