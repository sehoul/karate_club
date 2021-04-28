import { Component, OnInit } from '@angular/core';
import { Membre } from '../../membre.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  form= new FormGroup{
    Membre: new FormGroup();
  }

  constructor() { }
  ListMembres : any=[
     {id: 1 , categorie: 'A' , genre:'H' , grade: '2' }
  ];



  private membre:Array<Membre>=[
    new Membre(1,"123456789","nom1","prenom1",new Date("2019-01-02"),"Homme","C1","G1","Adresse 12 Rue 1","+33 6 12 12 12 12","+336 33 33 33 33","mail@mail.com",null,null,null,null,null,12.2,new Date("2019-01-02"),"bleu","shi haja")
  ]


  submit(f : NgForm) {
    console.log(f.membre);
    console.log(JSON.stringify(f.value));


   }







  ngOnInit(): void {

    }
  }
