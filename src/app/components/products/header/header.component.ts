import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(){}
  user = {
    userName:'',
    lastName:''
  }

  isLoggedIn:boolean= false
 
  ngOnInit(): void {
      let currentUser:any  = localStorage.getItem('user') 
    if (currentUser){
      currentUser = JSON.parse(currentUser)
      this.user.lastName = currentUser.userLastName
      this.user.lastName = currentUser.userName
      this.isLoggedIn = true
      }
  }
 


    onLogout(){
      localStorage.removeItem('user')
      this.user.lastName = ''
      this.user.userName = ''
    
    }


}
