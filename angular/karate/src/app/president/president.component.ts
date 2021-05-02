import { Component, OnInit } from '@angular/core';
import { PresidentService } from './president.service';

@Component({
  selector: 'app-president',
  templateUrl: './president.component.html',
  styleUrls: ['./president.component.css']
})
export class PresidentComponent implements OnInit {
//categories: Array<any>=[];

  constructor(private data:PresidentService) { }

  ngOnInit(): void { 
  }
  _active:boolean=false;
  side_bar_menu(){
      this._active=!this._active;
  }
}
