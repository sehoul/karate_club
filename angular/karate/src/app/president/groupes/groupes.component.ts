import { Component, OnInit } from '@angular/core';
import { Groupe } from 'src/app/groupe.model';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css']
})
export class GroupesComponent implements OnInit {
  groupes : Groupe[] = [];
  constructor() { }


  ngOnInit(): void {
    this.groupes=[new Groupe(1,'Groupe1','Instructeur1'),
    new Groupe(2,' Groupe2','Instructeur1'),
    new Groupe(3,'Groupe3','Instructeur2'),
    new Groupe(4,'Groupe4','Instructeur3'),
    new Groupe(5,'Groupe5','Instructeur4'),
    new Groupe(6,'Groupe6','Instructeur5'),
    new Groupe(7,'Groupe7','Instructeur1'),

  ];
  }


}
