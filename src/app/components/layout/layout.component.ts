import { Component } from '@angular/core';

import { NavbarComponent } from '../navbar/navbar.component';
import { ContentComponent } from '../content/content.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ContentComponent,NavbarComponent, NgIf],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isMinimized: boolean = false

  onToggleMinimizeNavBar = () => {
    this.isMinimized = !this.isMinimized;

  }
  
}
