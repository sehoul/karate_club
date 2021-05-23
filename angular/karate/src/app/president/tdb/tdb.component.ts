import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tdb',
  templateUrl: './tdb.component.html',
  styleUrls: ['./tdb.component.css']
})
export class TdbComponent implements OnInit {
  now:string="";
  todayDate:Date;
  constructor() { 
    this.todayDate = new Date();
    setInterval(() => {
      this.now = new Date().toString().split(' ')[4];
    }, 1);
  }

  ngOnInit(): void {
  }

}
