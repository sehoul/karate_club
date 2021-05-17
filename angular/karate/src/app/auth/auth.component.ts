import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import {AuthService} from '../Services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  //@ts-ignore
  form: FormGroup;


  constructor(private fb:FormBuilder, private Auth:AuthService, private router:Router,private cookie:CookieService) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      email:'',
      password:''
    });

  }
 
  error:string="";
  success:string="";

  submit(){

      const formData = this.form.getRawValue();
      const data={
        email: formData.email,
        password: formData.password
      }
      this.Auth.getUser(data).subscribe(
        result => {
            console.log(result);
            if(result.success){
              switch (result.result.roles) {
                  case 'secretaire':
                    this.Auth.setSecretaireLogedIn(true,result.result.id.toString()); this.router.navigate(['s'])  
                    break;
                  case 'president':
                    this.Auth.setPresidentLogedIn(true,result.result.id.toString()); this.router.navigate(['p'])  
                    break;
                  case 'admin':
                    this.Auth.setSecretaireLogedIn(true,result.result.id.toString()); this.router.navigate(['s'])  
                    break;
                  case 'instructeur':
                    this.Auth.setInstructeurLogedIn(true,result.result.id.toString()); this.router.navigate(['i'])  
                    break;
                
                  default:
                    this.cookie.deleteAll();
                    break;
              }           
            }
          },
        error=> {
          console.log('error');
          console.log(error);
          this.error=error.error.message;
        }
      );   
  }

}
