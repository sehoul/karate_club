import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder  ,FormControl , Validators } from '@angular/forms';
import { ActivitesService } from '../../Services/activites.service';
import { Activite } from '../../activite.model';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-add-activite',
  templateUrl: './add-activite.component.html',
  styleUrls: ['./add-activite.component.css']
})
export class AddActiviteComponent implements OnInit {
  form: FormGroup;
  _success:string="";
  _error:string="";

  constructor(private fb: FormBuilder,private Service:ActivitesService,private cookie:CookieService) {
    this.form=this.fb.group({
      nomactivite:  new FormControl('', [Validators.required]),
      Cotisation:new FormControl('', [Validators.required])    });
  }


  get nomactivite() : any {   return this.form.get('nomactivite');}
  get Cotisation() : any { return this.form.get('Cotisation');}

  submit() {
    const data={
      nomactivite:this.form.getRawValue().nomactivite,
      Cotisation:this.form.getRawValue().Cotisation,
    }
    if(data.nomactivite!="" && data.Cotisation!=""){

      this.Service.addActivite(Number(this.cookie.get('idPres')),data).subscribe(
        (res:any)=>{
          this._success="activitée ajoutée avec succes !";
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
  }
}
