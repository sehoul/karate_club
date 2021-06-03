import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { EmploidutempsService } from 'src/app/Services/emploidutemps.service';
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

  constructor(private instructeurService:InstructeurService,private groupeService:GroupesService, private EmploisDuTemps:EmploidutempsService, private fb: FormBuilder,private cookie:CookieService) {
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
      event:this.form.getRawValue().nomevenement,
      start:this.form.getRawValue().dateE,
      end:this.form.getRawValue().dateF,
      Instructeur:{ 
        id:Number(this.form.getRawValue().Instructeur)
      },
      groupe:{ id:Number(this.form.getRawValue().Activite)},
    }
    
    if(data.event!="" && data.Instructeur.id && data.groupe && data.start && data.end){
      console.log(data);
     this.EmploisDuTemps.addCrenau(Number(this.cookie.get('idSec')),data).subscribe(
        (res:any)=>{
          this._success="Crenau a été bien ajouté!";
          this._error="";
        },
        error=>{
          this._success="";
          this._error=error.error.message;
        }
      );
    }else{
      console.log(data);
      this._success="";
      this._error="Merci de remplir tous les champs";
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


  


