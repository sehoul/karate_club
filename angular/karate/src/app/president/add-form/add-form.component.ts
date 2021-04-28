import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  constructor() { }
  ListMembres=[
     {id: 1 , categorie: 'A' , genre:'H' , grade: '2' },
  ];

  submit(f:any) {
    console.log(f);
    f.value;


     }
  ngOnInit(): void {

    }
  }
