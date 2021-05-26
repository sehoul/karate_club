import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivitesService } from 'src/app/Services/activites.service';
import { GroupesService } from 'src/app/Services/groupes.service';
import { InstructeurService } from 'src/app/Services/instructeur.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  formAA: FormGroup;
  Instructeurs: Array<any>=[];
  Activites: Array<any>=[];
  _success:string="";
  _error:string="";

  constructor(private fb: FormBuilder, private groupeService:GroupesService,private activiteService:ActivitesService,private instructeurService:InstructeurService,private cookie:CookieService) {
    this.formAA=this.fb.group({
      NomAdm:  new FormControl('', [Validators.required]),
      PrenomAdm:  new FormControl('', [Validators.required]),
      MailAdm:  new FormControl('', [Validators.required]),
      TlphnAdm:  new FormControl('', [Validators.required]),
      MdpAdm:  new FormControl('', [Validators.required]),
      MdpAdmC:  new FormControl('', [Validators.required]),
      Role:  new FormControl('', [Validators.required]),
     

    });
   }


   get NomAdm() : any {   return this.formAA.get('NomAdm');}
   get PrenomAdm() : any {   return this.formAA.get('PrenomAdm');}
   get MailAdm() : any {   return this.formAA.get('MailAdm');}
   get TlphnAdm() : any {   return this.formAA.get('TlphnAdm');}
   get MdpAdm() : any {   return this.formAA.get('MdpAdm');}
   get MdpAdmC() : any {   return this.formAA.get('MdpAdmC');}
   get Role() : any {   return this.formAA.get('Role');}




   Roles : Array<any>=[ {id: 1 , val: 'President' }, {id: 2 , val: 'Secretaire' }, {id: 3 , val: 'Instructeur' } ];




  submit() {
    const data={
      NomAdm:this.formAA.getRawValue().NomAdm,
      PrenomAdm:{ 
        id:Number(this.formAA.getRawValue().PrenomAdm)
      },
      MailAdm:{ 
        id:Number(this.formAA.getRawValue().MailAdm)
      },
      TlphnAdm:{ 
        id:Number(this.formAA.getRawValue().TlphnAdm)
      },
      MdpAdm:{ 
        id:Number(this.formAA.getRawValue().MdpAdm)
      },
      MdpAdmC:{ 
        id:Number(this.formAA.getRawValue().MdpAdmC)
      },
      Role:{ 
        id:Number(this.formAA.getRawValue().Role)
      },
    }
    if(data.NomAdm!="" && data.PrenomAdm.id && data.MailAdm && data.TlphnAdm && data.MailAdm && data.MdpAdm && data.MdpAdmC && data.Role){

      this.groupeService.addGroupe(Number(this.cookie.get('idPres')),data).subscribe(
        (res:any)=>{
          this._success="Ajouté avec succes !";
          this._error="";
        },
        error=>{
          this._success="";
          this._error=error.error.message;
        }
      )
    }else{
      this._success="";
      this._error="merci de remplire tous les champs";
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
