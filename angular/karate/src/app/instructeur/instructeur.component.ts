import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../Services/Categorie.service";
import { LoadingService } from '../Services/loading.service';

@Component({
  selector: 'app-instructeur',
  templateUrl: './instructeur.component.html',
  styleUrls: ['./instructeur.component.css']
})
export class InstructeurComponent implements OnInit {


  constructor(public loader: LoadingService) { }
  loading$ = this.loader.loading$;


  ngOnInit(): void {
    
  }
  _active:boolean=false;
  side_bar_menu(){
    this._active=!this._active;
  }


}
