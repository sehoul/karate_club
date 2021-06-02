import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupesService} from "../../Services/groupes.service";
import {ActivitesService} from "../../Services/activites.service";
import {InstructeurService} from "../../Services/instructeur.service";
import {CookieService} from "ngx-cookie-service";
import {MembresService} from "../../Services/membres.service";

@Component({
  selector: 'app-addmembreactivites',
  templateUrl: './addmembreactivites.component.html',
  styleUrls: ['./addmembreactivites.component.css']
})
export class AddmembreactivitesComponent implements OnInit {

  formAA: FormGroup;
  Membres: Array<any>=[];
  Activites: Array<any>=[];
  _success:string="";
  _error:string="";


  constructor(private fb: FormBuilder, private activService:GroupesService , private activiteService:ActivitesService,private membreService:MembresService,private cookie:CookieService) {
    this.formAA=this.fb.group({
      Observation:  new FormControl('', [Validators.required]),
      Membre:new FormControl('', [Validators.required]),
      groupe:  new FormControl('',[Validators.required])


    });
  }


  get Observation() : any {   return this.formAA.get('Observation');}
  get Membre() : any { return this.formAA.get('Membre');}
  get groupe() : any { return this.formAA.get('groupe');}





  submit() {
    const data={
      Observation:this.formAA.getRawValue().Observation,
      Membre:{
        id:Number(this.formAA.getRawValue().Membre)
      },
      Activite:{
        id:Number(this.formAA.getRawValue().Activite)
      },
      groupesMembre:[{groupe:{id:Number(this.formAA.getRawValue().groupe)}}]
    }
    if(data.Observation!="" && data.Membre.id && data.Activite){

     // this.groupeService.addGroupe(Number(this.cookie.get('idSec')),data).subscribe(
       // (res:any)=>{
       //   this._success="groupe ajoutée avec succes !";
       //   this._error="";
       // },
       // error=>{
       //   this._success="";
       //   this._error=error.error.message;
       // }
     // )
   // }else{
    //  this._success="";
     // this._error="merci de remplire tous les champs";
   }
    console.log(this.formAA.getRawValue())}

  ngOnInit(): void {
    this.activService.getGroupes().subscribe((response: any) =>{
      console.log(response);
      this.Activites=response;
    });
    this.membreService.getMembres().subscribe((resp:any)=>{
      this.Membres=resp;
    });

  }


}
