import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LoginService } from './service/login.service';
import { SignUp } from './models/signup';
import { HttpClientModule } from '@angular/common/http';
import { LogIn } from './models/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [LoginService]
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private LoginService: LoginService) { }
  title = 'crm-system';


  ngOnInit(): void {
    
    let user: any = localStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      this.LoginService.onLogin().subscribe({
        next: data => {
          const isUser = data.find((el: SignUp) => {
            return el.email == user?.email && el.password === user?.password
          })
          if (isUser) {

            localStorage.setItem('user', JSON.stringify(user))

            if (this.router.url == "/login" || this.router.url == '/signup') {
              this.router.navigate(['auth/dashboard'])
            }

          }
        }

      })
    }
  }

}
