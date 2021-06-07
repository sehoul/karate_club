import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AdministrationService } from 'src/app/Services/administration.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

 
  formAA: FormGroup;
  _success:string="";
  _error:string="";

  constructor(private fb: FormBuilder,private cookie:CookieService, private AdminService:AdministrationService) {
    this.formAA=this.fb.group({
      LicenceIns:  new FormControl('', [Validators.required]),
      NomIns:  new FormControl('', [Validators.required]),
      PrenomIns:  new FormControl('', [Validators.required]),
      MailIns:  new FormControl('', [Validators.required]),
      TlphnIns:  new FormControl('', [Validators.required]),
     
     },{ 
    
    });
   }

 


   get LicenceIns() : any {   return this.formAA.get('LicenceIns');}
   get NomIns() : any {   return this.formAA.get('NomIns');}
   get PrenomIns() : any {   return this.formAA.get('PrenomIns');}
   get MailIns() : any {   return this.formAA.get('MailIns');}
   get TlphnIns() : any {   return this.formAA.get('TlphnIns');}




   


  submit() {
    const data={
      Nom:this.formAA.getRawValue().NomIns,
      Prenom:this.formAA.getRawValue().PrenomIns,
      Email:this.formAA.getRawValue().MailIns,
      Tel:this.formAA.getRawValue().TlphnIns,
      Licence:this.formAA.getRawValue().LicenceIns,
    }
    if(data.Nom!="" && data.Prenom!="" && data.Tel!="" && data.Email!="" && data.Licence!=""){
      this.AdminService.register(Number(this.cookie.get('idPres')),data).subscribe(
        (res:any)=>{
            this._success=res.message;
            this._error="";
        },
        error=>{
          this._success="";
          this._error=error.error.message;
        }
        );
    }else{
      this._success="";
      this._error="Merci de remplir tous les champs";
    }

  }

  ngOnInit(): void {

  }
}
