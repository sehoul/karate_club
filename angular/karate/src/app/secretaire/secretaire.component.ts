import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../Services/Categorie.service';
import { LoadingService } from '../Services/loading.service';

@Component({
  selector: 'app-secretaire',
  templateUrl: './secretaire.component.html',
  styleUrls: ['./secretaire.component.css']
})
export class SecretaireComponent implements OnInit {


  constructor(public loader: LoadingService) { }
  loading$ = this.loader.loading$;


  ngOnInit(): void {
  }
  _active:boolean=false;
  side_bar_menu(){
      this._active=!this._active;
  }
}
