import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HistoriqueService } from 'src/app/Services/historique.service';

@Component({
  selector: 'app-tdb',
  templateUrl: './tdb.component.html',
  styleUrls: ['./tdb.component.css']
})
export class TdbComponent implements OnInit {

  now:string="";
  
  todayDate:Date;
  
  constructor(private cookie:CookieService) { 
    this.todayDate = new Date();
    setInterval(() => {
      this.now = new Date().toString().split(' ')[4];
    }, 1);
  }

  ngOnInit(): void {
    
    
  
  }

}
