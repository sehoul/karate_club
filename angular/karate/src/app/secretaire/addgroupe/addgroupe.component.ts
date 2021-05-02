import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Groupe } from 'src/app/groupe.model';

@Component({
  selector: 'app-addgroupe',
  templateUrl: './addgroupe.component.html',
  styleUrls: ['./addgroupe.component.css']
})
export class AddgroupeComponent implements OnInit {
  formAA: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formAA=this.fb.group({
      NomGroupe:  new FormControl('', [Validators.required]),
      Instructeur:new FormControl('', [Validators.required]),
    });
   }


   get NomGroupe() : any {   return this.formAA.get('NomGroupe');}
   get Instructeur() : any { return this.formAA.get('Instructeur');}
   private groupe:Array<Groupe>=[new Groupe(1,"Groupe1","Mostafa")]
   Instructeurs: Array<any>=[ {id: 1 , nom: 'Ali' }, {id: 2 , nom: 'Amine' }, {id: 3 , nom: 'Walid' } ];


   submit() {
    console.log(this.formAA.getRawValue());
    const data=this.formAA.getRawValue();
    this.groupe.push(new Groupe(data.id,data.NomGroupe,data.Instructeur));
    console.log(this.groupe);}

  ngOnInit(): void {
  }

}
