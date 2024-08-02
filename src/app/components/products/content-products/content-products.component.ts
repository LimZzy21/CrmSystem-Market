import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponentCategory } from "../navbar/navbar.component";
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-content-products',
  standalone: true,
  imports: [RouterOutlet, NavbarComponentCategory, HeaderComponent],
  templateUrl: './content-products.component.html',
  styleUrl: './content-products.component.css'
})
export class ContentProductsComponent {
}
