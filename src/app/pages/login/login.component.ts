import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import {  HttpClientModule } from '@angular/common/http';
import { SignUp } from '../../models/signup';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  constructor(private LoginService: LoginService, private router: Router) { }

 
  ngOnInit(): void {
   
  }

  onLogin() {

    this.LoginService.onLogin().subscribe({
      next:data=>{
        const user = data.find((el:SignUp)=>{
          return el.email == this.loginForm.value.email && el.password === this.loginForm.value.password
        })
        this.loginForm.value.isAdmin == user.isAdmin

        
        if (user.lenght!=0 && user.isEmployee == true){
          alert('login succesful')
          localStorage.setItem('user', JSON.stringify(user))
          this.router.navigate(['auth/dashboard'])
          
          
        }else if(!user){
          alert('user not found!')
          this.router.navigate(['/login'])
        }else if(user.lenght!=0 && user.isEmployee == false){
          delete user.password
          localStorage.setItem('user', JSON.stringify(user))
          this.router.navigate(['/shop/products'])
        }
      
      }
      
    })
    
  }

  loginForm: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.min(8)]),
    'isAdmin': new FormControl(false)
  })
}