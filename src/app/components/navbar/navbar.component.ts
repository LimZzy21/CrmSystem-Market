import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../service/login.service';
import {  HttpClientModule } from '@angular/common/http';
import { SignUp } from '../../models/signup';
import { CurrentUser } from '../../models/currentUser';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers:[LoginService]
})


export class NavbarComponent implements OnInit {
  constructor(private router: Router, private LoginService: LoginService) { }

  @Input() onToggleMinimizeNavBar!:()=>void

  currentUser: CurrentUser = {
    userName:'',
    userLastName:''
  }

  


  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);

      this.LoginService.onLogin().subscribe({
        next: (data) => {
          const matchedUser = data.find((el: SignUp) => el.email === parsedUser.email && el.password === parsedUser.password)
          if (matchedUser) {
            this.currentUser = {
              userName: matchedUser.userName,
              userLastName: matchedUser.userLastName
            }
          } 
        }
      });
    }
  }

 

  onLogout() {
    localStorage.removeItem('user')
    this.router.navigate(['login'])
  
  }
}
