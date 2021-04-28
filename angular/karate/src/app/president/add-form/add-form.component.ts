import { Component, OnInit } from '@angular/core';
import { Membre } from '../../membre.model';
import { NgForm , FormGroup , FormBuilder  ,FormControl , Validators } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
<<<<<<< Updated upstream
  form:  FormGroup


  constructor(private fb: FormBuilder) {

    this.form=this.fb.group({
      nom:  new FormControl('', [Validators.required]),
      licenceFFK:  new FormControl('', [Validators.required]),
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
=======

  constructor() { }
>>>>>>> Stashed changes
  ListMembres : any=[

     {id: 1 , categorie: 'A' , genre:'H' , grade: '2' }
  ];



  private membre:Array<Membre>=[
    new Membre(1,"123456789","nom1","prenom1",new Date("2019-01-02"),"Homme","C1","G1","Adresse 12 Rue 1","+33 6 12 12 12 12","+336 33 33 33 33","mail@mail.com",null,null,null,null,null,12.2,new Date("2019-01-02"),"bleu","shi haja")
  ]


<<<<<<< Updated upstream
  submit() {
    console.log(this.form.getRawValue());
=======
  submit(f : NgForm) {
    console.log(f);
    console.log(JSON.stringify(f.value));
>>>>>>> Stashed changes


   }







  ngOnInit(): void {

    }
  }
