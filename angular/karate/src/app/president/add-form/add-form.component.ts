import { Component, OnInit } from '@angular/core';
import { Membre } from '../../membre.model';
import { FormGroup , FormBuilder  ,FormControl , Validators } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form=this.fb.group({
      nom:  new FormControl('', [Validators.required]),
      licenceFFK:new FormControl('', [Validators.required]),
      prenom:  new FormControl('', [Validators.required]),
      dateN:  new FormControl('', [Validators.required]),
      dateI:  new FormControl('', [Validators.required]),
      genre:  new FormControl('', [Validators.required]),
      categorie:  new FormControl('', [Validators.required]),
      tlphn1:  new FormControl('', [Validators.required]),
      tlphn2:  new FormControl('', [Validators.required]),
      email:  new FormControl('', [Validators.required]),
      nomP: new FormControl('', [Validators.required]),
      prenomP:  new FormControl('', [Validators.required]),
      emailP:  new FormControl('', [Validators.required]),
      cotisation:  new FormControl('', [Validators.required]),
      grade:  new FormControl('', [Validators.required]),
      observation:  new FormControl('', [Validators.required]),


    });
  }

 get licenceFFK() : any {
    return this.form.get('licenceFFK');
 }
 get nom() : any {
   return this.form.get('nom');
}
get prenom() : any {
  return this.form.get('prenom');
}
get dateN() : any {
  return this.form.get('dateN');
}
get dateI() : any {
  return this.form.get('dateI');
}
get genre() : any {
  return this.form.get('genre');
}
get categorie() : any {
  return this.form.get('categorie');
}
get tlphn1() : any {
  return this.form.get('tlphn1');
}
get tlphn2() : any {
  return this.form.get('tlphn2');
}
get email() : any {
  return this.form.get('email');
}
get nomP() : any {
  return this.form.get('nomP');
}
get prenomP() : any {
  return this.form.get('prenomP');
}
get emailP() : any {
  return this.form.get('emailP');
}
get cotisation() : any {
  return this.form.get('cotisation');
}
get grade() : any {
  return this.form.get('grade');
}
get observation() : any {
  return this.form.get('observation');
}

  ListMembres : any=[

     {id: 1 , categorie: 'A' , genre:'H' , grade: '2' }
  ];



  private membre:Array<Membre>=[
    new Membre(1,"123456789","nom1","prenom1",new Date("2019-01-02"),"Homme","C1","G1","Adresse 12 Rue 1","+33 6 12 12 12 12","+336 33 33 33 33","mail@mail.com",null,null,null,null,null,12.2,new Date("2019-01-02"),"bleu","shi haja")
  ]


  submit() {
    console.log(this.form.getRawValue());


   }







  ngOnInit(): void {

    }
  }
