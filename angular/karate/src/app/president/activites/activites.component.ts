import { Component, OnInit } from '@angular/core';
import { Activite } from 'src/app/activite.model';

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrls: ['./activites.component.css']
})
export class ActivitesComponent implements OnInit {
  activites : Activite[] = [];

  constructor() { }

  ngOnInit(): void {
    this.activites=[new Activite(1,'Body karate',200),
    new Activite(2,' karate',240),
    new Activite(3,' Self defense',250),

  ];
  }

}
