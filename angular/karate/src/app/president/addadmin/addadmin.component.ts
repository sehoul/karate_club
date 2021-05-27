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
  _success:string="";
  _error:string="";

  constructor(private fb: FormBuilder,private cookie:CookieService) {
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

   ConfirmedValidator(controlName: string, matchingControlName: string){
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




   Roles : Array<any>=[ {val: 'President'}, {val: 'Secretaire'}, {val: 'Instructeur'} ];




  submit() {
    const data={
      NomAdm:this.formAA.getRawValue().NomAdm,
      PrenomAdm:this.formAA.getRawValue().PrenomAdm,
      MailAdm:this.formAA.getRawValue().MailAdm,
      TlphnAdm:this.formAA.getRawValue().TlphnAdm,
      MotDePasse:this.formAA.getRawValue().MotDePasse,
      ConfirmationMotDePasse:this.formAA.getRawValue().ConfirmationMotDePasse,
      Role:this.formAA.getRawValue().Role,
    }
    if(data.NomAdm!="" && data.MailAdm!="" && data.TlphnAdm!="" && data.MailAdm!="" && data.MotDePasse!="" && data.ConfirmationMotDePasse!="" && data.Role!=""){

    }else{
      this._success="";
      this._error="merci de remplire tous les champs";
    }

  }

  ngOnInit(): void {

  }
}
