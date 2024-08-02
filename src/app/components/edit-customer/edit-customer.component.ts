import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../service/signup.service';
import { Customer } from '../../models/customer';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, FormsModule, NgIf, NgClass],
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  providers: [SignupService]
})
export class EditCustomerComponent implements OnInit {
  constructor(private signupService: SignupService, private route: ActivatedRoute, private router: Router) { }

  isProfile: boolean =  this.route.snapshot.url[0]?.path === 'profile';;
   id: string = '';
  isAdmin:boolean =false
 

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.params['id'];
    
   
    
    if (id) {
      this.loadUser(id);
    } else {
      const localUser = localStorage.getItem('user');
      if (localUser) {
        const localId = JSON.parse(localUser).id;
        this.loadUser(localId);
      }
    }
  }

  loadUser(id: string): void {
    this.signupService.getUser(id).subscribe({
      next: (data) => {
        this.editUser.patchValue({
          id: data.id,
          userName: data.userName,
          userLastName: data.userLastName,
          email: data.email,
          isEmployee: data.isEmployee,
          position: data.position,
          location: data.location,
          company: data.company,
          
        });
        this.id = data.id;
        this.isAdmin = data.isAdmin
      }
    });
    
    
  }

  isEmployeeFunc(): string {
    return this.editUser.value.isEmployee ? 'Yes' : 'No';
  }

  toggleEmployee(): void {
    this.editUser.patchValue({ isEmployee: !this.editUser.value.isEmployee });
  }

  submitEdit(): void {
    if (this.editUser.valid) {
      const customer: Customer = this.editUser.getRawValue();
      this.signupService.editUser(customer, this.id).subscribe(() => {
        this.router.navigate(['/auth/profile']);
      });
    }
  }

  gotoEdit(): void {
    this.router.navigate([`/auth/user-edit/${this.id}`]);
  }

  editUser: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: this.isProfile }),
    location: new FormControl({ value: '', disabled: this.isProfile }),
    company: new FormControl({ value: '', disabled: this.isProfile }),
    userName: new FormControl({ value: '', disabled: this.isProfile }, [Validators.required, Validators.minLength(4)]),
    userLastName: new FormControl({ value: '', disabled: this.isProfile }, [Validators.required, Validators.minLength(4)]),
    email: new FormControl({ value: '', disabled: this.isProfile }, [Validators.required, Validators.email]),
    isEmployee: new FormControl(false),
    position: new FormControl({ value: '', disabled: this.isProfile }),
    
  });
}
