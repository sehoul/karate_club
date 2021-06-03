import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivitesService } from 'src/app/Services/activites.service';
import { AdministrationService } from 'src/app/Services/administration.service';
import { GroupesService } from 'src/app/Services/groupes.service';
import { InstructeurService } from 'src/app/Services/instructeur.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  formAA: FormGroup;
  _success:string="";
  _error:string="";

  constructor(private fb: FormBuilder,private cookie:CookieService, private AdminService:AdministrationService) {
    this.formAA=this.fb.group({
      NomAdm:  new FormControl('', [Validators.required]),
      PrenomAdm:  new FormControl('', [Validators.required]),
      MailAdm:  new FormControl('', [Validators.required]),
      TlphnAdm:  new FormControl('', [Validators.required]),
      MotDePasse:  new FormControl('', [Validators.required]),
      ConfirmationMotDePasse:  new FormControl('', [Validators.required]),
      Role:  new FormControl('', [Validators.required]),
     },{ 
      validator: this.ConfirmedValidator('MotDePasse', 'ConfirmationMotDePasse')
    });
   }

   ConfirmedValidator(controlName: string, matchingControlName: string ){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }


   get NomAdm() : any {   return this.formAA.get('NomAdm');}
   get PrenomAdm() : any {   return this.formAA.get('PrenomAdm');}
   get MailAdm() : any {   return this.formAA.get('MailAdm');}
   get TlphnAdm() : any {   return this.formAA.get('TlphnAdm');}
   get MotDePasse() : any {   return this.formAA.get('MotDePasse');}
   get ConfirmationMotDePasse() : any {   return this.formAA.get('ConfirmationMotDePasse');}
   get Role() : any {   return this.formAA.get('Role');}




   Roles : Array<any>=[ {val: 'president'}, {val: 'secretaire'}, {val: 'instructeur'} ];


  submit() {
    const data={
      Nom:this.formAA.getRawValue().NomAdm,
      Prenom:this.formAA.getRawValue().PrenomAdm,
      Email:this.formAA.getRawValue().MailAdm,
      Tel:this.formAA.getRawValue().TlphnAdm,
      Password:this.formAA.getRawValue().MotDePasse,
      Role:this.formAA.getRawValue().Role,
    }
    if(data.Nom!="" && data.Prenom!="" && data.Tel!="" && data.Email!="" && data.Password!="" && this.formAA.getRawValue().ConfirmationMotDePasse!="" && data.Role!=""){
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
