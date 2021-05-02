import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secretaire',
  templateUrl: './secretaire.component.html',
  styleUrls: ['./secretaire.component.css']
})
export class SecretaireComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  _active:boolean=false;
  side_bar_menu(){
      this._active=!this._active;
  }
}
