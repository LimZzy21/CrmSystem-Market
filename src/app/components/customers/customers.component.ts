import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Customer } from '../../models/customer';
import { CustomerSearchPipe } from '../../pipes/customer-search.pipe';
import { FormsModule } from '@angular/forms';
import { IsEmployeeFilterPipe } from '../../pipes/is-employee-filter.pipe';
import { ActivatedRoute,  Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [NgFor,
    HttpClientModule,
    FormsModule,
    CustomerSearchPipe,
    NgIf,
    IsEmployeeFilterPipe,
    RouterLink, 
  NgClass],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
  providers: [LoginService, CustomerSearchPipe, IsEmployeeFilterPipe]
})
export class CustomersComponent implements OnInit {
  constructor(private LoginService: LoginService, private route: ActivatedRoute, private router:Router) { }

  customers: Customer[] = []
  searchStr: string = ''
  position: string = ''

  ngOnInit(): void {
    this.LoginService.onLogin().subscribe({
      next: (data) => this.customers = data
    })
  }

  userEdit(id:string){
    this.router.navigate([`/auth/user-edit/${id}`])
  }

  filterByPosition(position:string){
    if(this.position.length === 0){
      this.position = position
      return
    }else if(position == this.position){
      this.position = ''
      return
    }

    this.position = position
    
    
    
    
  
  }

}
