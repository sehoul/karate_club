import { Component, OnInit } from '@angular/core';
import { PresidentService } from './president.service';

@Component({
  selector: 'app-president',
  templateUrl: './president.component.html',
  styleUrls: ['./president.component.css']
})
export class PresidentComponent implements OnInit {
  categories!: any[];

  constructor(private service: PresidentService) { }

  

  ngOnInit(): void {



    this.service.getCategories().subscribe((respone: any) => {
     console.log(respone);
     this.categories=respone, (error: any) => {
         alert('An unexpected error occured.');
     };

    });
  }








  _active:boolean=false;
  side_bar_menu(){
      this._active=!this._active;
  }
}
