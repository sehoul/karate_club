import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../Services/Categorie.service';

@Component({
  selector: 'app-president',
  templateUrl: './president.component.html',
  styleUrls: ['./president.component.css']
})
export class PresidentComponent implements OnInit {
categories: Array<any>=[];

  constructor(private data:CategoriesService) { }

  ngOnInit(): void { 
    this.data.getCategories().subscribe((category:any)=>{
      this.categories=category;
      console.log(this.categories);
    })
  }
  _active:boolean=false;
  side_bar_menu(){
      this._active=!this._active;
  }
}
