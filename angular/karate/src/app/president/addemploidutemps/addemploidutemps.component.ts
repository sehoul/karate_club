import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GroupesService } from 'src/app/Services/groupes.service';
import { InstructeurService } from 'src/app/Services/instructeur.service';

@Component({
  selector: 'app-addemploidutemps',
  templateUrl: './addemploidutemps.component.html',
  styleUrls: ['./addemploidutemps.component.css']
})
export class AddemploidutempsComponent implements OnInit {

  form: FormGroup;
  _success:string="";
  _error:string="";
  activiteService: any;
  Activites: any;
  Instructeurs: any;

  constructor(private instructeurService:InstructeurService,private groupeService:GroupesService, private fb: FormBuilder,private cookie:CookieService) {
    this.form=this.fb.group({
      nomevenement:  new FormControl('', [Validators.required]),
      dateE:new FormControl('', [Validators.required]),
      dateF:new FormControl('', [Validators.required]),
      Instructeur:new FormControl('', [Validators.required]),
      Activite:new FormControl('', [Validators.required]),
      Groupe:new FormControl('', [Validators.required]),
    });
  }
 

  get nomevenement() : any {   return this.form.get('nomevenement');}
  get dateE() : any { return this.form.get('dateE');}
  get dateF() : any { return this.form.get('dateF');}
  get Instructeur() : any { return this.form.get('Instructeur');}
  get Activite() : any { return this.form.get('Activite');}
  get Groupe() : any { return this.form.get('Groupe');}

  submit() {
    const data={
      nomevenement:this.form.getRawValue().nomevenement,
      dateE:this.form.getRawValue().dateE,
      dateF:this.form.getRawValue().dateF,

      Instructeur:{ 
        id:Number(this.form.getRawValue().Instructeur)
      },
      Activite:{ 
        id:Number(this.form.getRawValue().Activite)
      },
      Groupe:{ 
        id:Number(this.form.getRawValue().Groupe)
      },
    }
  
    
    if(data.nomevenement!="" && data.Instructeur.id && data.Activite && data.dateE && data.dateF && data.Activite){

     /*this.EmploidutempsService.getGroupes(Number(this.cookie.get('idPres')),data).subscribe(
        (res:any)=>{
          this._success="Crenau ajoutée avec succes !";
          this._error="";
        },
        (error: { error: { message: string; }; })=>{
          this._success="";
          this._error=error.error.message;
        }
      )*/


    }else{
      this._success="";
      this._error="merci de remplire tous les champs";
    }

  
}

  ngOnInit(): void {
    this.groupeService.getGroupes().subscribe((resp:any)=>{
      this.Activites=resp;
      console.log(resp);
    });
    this.instructeurService.getInstructeursMiniInfo().subscribe((resp:any)=>{
      this.Instructeurs=resp;
    });

  }
  }


  


