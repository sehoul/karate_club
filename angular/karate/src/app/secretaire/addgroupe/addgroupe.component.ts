import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Groupe } from 'src/app/groupe.model';
import { ActivitesService } from 'src/app/Services/activites.service';
import { GroupesService } from 'src/app/Services/groupes.service';
import {InstructeurService} from '../../Services/instructeur.service';

@Component({
  selector: 'app-addgroupe',
  templateUrl: './addgroupe.component.html',
  styleUrls: ['./addgroupe.component.css']
})
export class AddgroupeComponent implements OnInit {
  formAA: FormGroup;
  Instructeurs: Array<any>=[];
  Activites: Array<any>=[];
  _success:string="";
  _error:string="";


  constructor(private fb: FormBuilder, private groupeService:GroupesService,private activiteService:ActivitesService,private instructeurService:InstructeurService,private cookie:CookieService) {
    this.formAA=this.fb.group({
      NomGroupe:  new FormControl('', [Validators.required]),
      Instructeur:new FormControl('', [Validators.required]),
      Activite:new FormControl('', [Validators.required]),

    });
   }


   get NomGroupe() : any {   return this.formAA.get('NomGroupe');}
   get Instructeur() : any { return this.formAA.get('Instructeur');}
   get Activite() : any { return this.formAA.get('Activite');}



  submit() {
    const data={
      NomGroupe:this.formAA.getRawValue().NomGroupe,
      Instructeur:{ 
        id:Number(this.formAA.getRawValue().Instructeur)
      },
      Activite:{ 
        id:Number(this.formAA.getRawValue().Activite)
      },
    }
    if(data.NomGroupe!="" && data.Instructeur.id && data.Activite){

      this.groupeService.addGroupe(Number(this.cookie.get('idSec')),data).subscribe(
        (res:any)=>{
          this._success="Groupe a été bien ajouté!";
          this._error="";
        },
        error=>{
          this._success="";
          this._error=error.error.message;
        }
      )
    }else{
      this._success="";
      this._error="Merci de remplir tous les champs";
    }

  }

  ngOnInit(): void {
    this.activiteService.getActivites().subscribe((resp:any)=>{
      this.Activites=resp;
    });
    this.instructeurService.getInstructeursMiniInfo().subscribe((resp:any)=>{
      this.Instructeurs=resp;
    });

  }

}
