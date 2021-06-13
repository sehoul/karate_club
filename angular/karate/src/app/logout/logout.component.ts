import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router,private Auth:AuthService,private cookie:CookieService) { }

  ngOnInit(): void {
      this.Auth.setSecretaireLogedIn(false,'');
      this.Auth.setPresidentLogedIn(false,'');
      this.Auth.setInstructeurLogedIn(false,'');
      this.cookie.deleteAll();
      this.router.navigate(['connexion'])
   
  }

}
