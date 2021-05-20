import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Groupe } from 'src/app/groupe.model';
import { ActivitesService } from 'src/app/Services/activites.service';
import { GroupesService } from 'src/app/Services/groupes.service';

@Component({
  selector: 'app-addgroupe',
  templateUrl: './addgroupe.component.html',
  styleUrls: ['./addgroupe.component.css']
})
export class AddgroupeComponent implements OnInit {
  formAA: FormGroup;
  Instructeurs: Array<any>=[ {id: 1 , nom: 'Ali' }, {id: 2 , nom: 'Amine' }, {id: 3 , nom: 'Walid' } ];
  Activites: Array<any>=[];


  constructor(private fb: FormBuilder, private groupeService:GroupesService,private activiteService:ActivitesService) {
    this.formAA=this.fb.group({
      NomGroupe:  new FormControl('', [Validators.required]),
      Instructeur:new FormControl('', [Validators.required]),
      Activite:new FormControl('', [Validators.required]),

    });
   }


   get NomGroupe() : any {   return this.formAA.get('NomGroupe');}
   get Instructeur() : any { return this.formAA.get('Instructeur');}
   get Activite() : any { return this.formAA.get('NomActivite');}



  submit() {
    console.log(this.formAA.getRawValue());
    const data=this.formAA.getRawValue();
  }

  ngOnInit(): void {
    this.activiteService.getActivites().subscribe((resp:any)=>{
      this.Activites=resp;
    })

  }

}
