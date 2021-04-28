import { Component} from '@angular/core';
import { Membre } from 'src/app/membre.model';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {

  ListMembres=[
    {id: 1 , categorie: 'A' , genre:'H' , grade: '2' },
 ];


 private membre:Array<Membre>=[
  new Membre(1,"123456789","nom1","prenom1",new Date("2019-01-02"),"Homme","C1","G1","Adresse 12 Rue 1","+33 6 12 12 12 12","+336 33 33 33 33","mail@mail.com",null,null,null,null,null,12.2,new Date("2019-01-02"),"bleu","shi haja")
]

  log(x:any) {console.log(x);}


  //submit(f:any) {
    //console.log(f);}

  onsubmit(form: NgForm) {

    console.log(form.value.membre);

  }
}
