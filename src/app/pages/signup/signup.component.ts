import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from '../../service/signup.service';
import { HttpClientModule } from '@angular/common/http';
import { formatDate, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PeopleService } from '../../service/people.service';
import { SignUp } from '../../models/signup';
import { PeopleChart } from '../../components/dashboard/dashboard.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, NgIf, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [SignupService, PeopleService]
})

export class SignupComponent implements OnInit {

  constructor(
    private SignUpService: SignupService,
    private router: Router,
    private PeopleService: PeopleService
  ) { }
  usersRegistered: PeopleChart = {
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

  ngOnInit(): void {
    this.PeopleService.getCustomers().subscribe({
      next: data => this.usersRegistered = data
    })
  }

  onSignUp() {
    if (this.createUserForm.valid) {
      const data: SignUp = this.createUserForm.value
      const date = new Date()
      data.whenRegister = formatDate(date, 'dd-MM-yyyy', 'en-ES')

      let key = formatDate(date, 'MMM', 'en-ES').toLowerCase()

      const objUser:any = this.usersRegistered
      for (const el in objUser ) {
        if(el === key){
          objUser[key] = objUser[key]+1
          
        }
      }


      this.PeopleService.patchCustomers(objUser).subscribe({})





      this.SignUpService.createUser(this.createUserForm.value).subscribe({
        next: () => console.log('user created')
      })
      // this.router.navigate(['auth/dashboard'])

    }
  }

  createUserForm: FormGroup = new FormGroup({
    'userName': new FormControl('', [Validators.required, Validators.min(2)]),
    'userLastName': new FormControl('', [Validators.required, Validators.min(2)]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.min(8)]),
    'location': new FormControl('', [Validators.required]),
    'company': new FormControl(''),
  })
}
