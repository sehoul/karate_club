import { Component, OnInit} from '@angular/core';
import { Membre } from '../../membre.model';
import { FormGroup , FormBuilder  ,FormControl , Validators } from '@angular/forms';
import { CategoriesService } from '../../Services/Categorie.service';
import { MembresService } from 'src/app/Services/membres.service';
import { CookieService } from 'ngx-cookie-service';
import {DatePipe} from "@angular/common";
import {formatDate} from '@angular/common';
import { ActivitesService } from 'src/app/Services/activites.service';
import { SaisonService } from 'src/app/Services/saison.service';

interface Categorie{
  id:number,
  nomCategorie:string,
  Description:string
  };

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  form: FormGroup;
  _success:string="";
  _error:string="";
  constructor(private fb: FormBuilder,
              private service:CategoriesService, 
              private activService:ActivitesService,
              private membreService:MembresService,
              private cookie:CookieService,
              private SaisonsService:SaisonService) {
   
 
    this.form=this.fb.group({
      nom:  new FormControl('', [Validators.required]),
      licenceFFK:new FormControl('', [Validators.required]),
      prenom:  new FormControl('', [Validators.required]),
      dateN:  new FormControl('', [Validators.required]),
      dateI:  new FormControl('', [Validators.required]),
      genre:  new FormControl('', [Validators.required]),
      categorie:  new FormControl('',[Validators.required]),
      groupe:  new FormControl('',[Validators.required]),
      adresse:  new FormControl('',[Validators.required]),
      tlphn1:  new FormControl('', [Validators.required]),
      tlphn2:  new FormControl('', [Validators.required]),
      email:  new FormControl('', [Validators.required]),
      nomP: new FormControl('', [Validators.required]),
      prenomP:  new FormControl('', [Validators.required]),
      tlphn1P:  new FormControl('', [Validators.required]),
      tlphn2P:  new FormControl('', [Validators.required]),
      emailP:  new FormControl('', [Validators.required]),
      cotisation:  new FormControl('', [Validators.required]),
      grade:  new FormControl('', [Validators.required]),
      observation:  new FormControl('', [Validators.required]),
      saison:  new FormControl('', [Validators.required]),


    });
  }

  get licenceFFK() : any {   return this.form.get('licenceFFK');}
  get nom() : any { return this.form.get('nom');}
  get prenom() : any { return this.form.get('prenom');}
  get dateN() : any { return this.form.get('dateN');}
  get dateI() : any { return this.form.get('dateI');}
  get genre() : any { return this.form.get('genre');}
  get categorie() : any { return this.form.get('categorie');}
  get groupe() : any { return this.form.get('groupe');}
  get adresse() : any { return this.form.get('adresse');}
  get tlphn1() : any { return this.form.get('tlphn1');}
  get tlphn2() : any { return this.form.get('tlphn2');}
  get email() : any { return this.form.get('email');}
  get nomP() : any { return this.form.get('nomP');}
  get prenomP() : any { return this.form.get('prenomP');}
  get tlphn1P() : any { return this.form.get('tlphn1P');}
  get tlphn2P() : any { return this.form.get('tlphn2P');}
  get emailP() : any { return this.form.get('emailP');}
  get cotisation() : any { return this.form.get('cotisation');}
  get grade() : any { return this.form.get('grade');}
  get observation() : any { return this.form.get('observation');}
  get saison() : any { return this.form.get('saison');}


  
  Covalid:boolean=false
  //@ts-ignore
  cotisation:any;
  update_cotisation(value:any,cotisation:any){
    this.Covalid=true;
    this.Activities.forEach(element => {
      element.Groupe.forEach((groupe: { id: number; }) => {
      if(groupe.id==Number(value)){
        cotisation.value=element.cotisation;
       
      }
    })
    });
  }

  informationParentalRequired:boolean=true

  dd(elem:any){
    let date1 =formatDate(new Date(), 'yyyy/MM/dd', 'fr');
    let date2 = new Date(date1);
    let date3 = new Date(elem.value);
    let diff = date2.getTime() - date3.getTime();
    let years = (diff / (1000*3600*24))/365;
    if(years>18)
        this.informationParentalRequired=false;
      else
        this.informationParentalRequired=true;
  }

  keyPress(element:any,event: KeyboardEvent) {
    const pattern = /[~`!@#$%\^&*()+=\-\[\]\\';, .??????/{}|\\":<>\?]/;
    const inputChar = event.key;
    element.value.replace(pattern, "");
}
isValid(str:string) {
  return !/[~`!@#$%\^&*()+=\-\[\]\\';, .^????/{}|\\":<>\?]/g.test(str);
}

  submit() {
    const data={
      Adresse:this.form.getRawValue().adresse,
      NumLicenceFFK:this.form.getRawValue().licenceFFK,
      Categorie:{ id: Number(this.form.getRawValue().categorie) },
      DateNaissance:this.form.getRawValue().dateN,
      Email:this.form.getRawValue().email,
      genre:this.form.getRawValue().genre,
      prenom:this.form.getRawValue().prenom,
      nom:this.form.getRawValue().nom,
      telephone1:this.form.getRawValue().tlphn1,
      telephone2:this.form.getRawValue().tlphn2,
      dateInscription:this.form.getRawValue().dateI,
      emailParents:this.form.getRawValue().emailP,
      nomParents:this.form.getRawValue().nomP,
      prenomParents:this.form.getRawValue().prenomP,
      telephoneParents1:this.form.getRawValue().tlphn1P,
      telephoneParents2:this.form.getRawValue().tlphn2P,
      observation:this.form.getRawValue().observation,
      grade:this.form.getRawValue().grade,
      groupesMembre:[{groupe:{id:Number(this.form.getRawValue().groupe)}}],
      cotisation:this.form.getRawValue().cotisation,
      saisonMembres:[{saison:{id:Number(this.form.getRawValue().saison)}}]
    }

    if( this.form.getRawValue().adresse != "" &&
    this.isValid(this.form.getRawValue().licenceFFK) &&
        this.form.getRawValue().categorie != "" &&
        this.form.getRawValue().dateN != "" &&
        this.form.getRawValue().email != "" &&
        this.form.getRawValue().genre != "" &&
        this.form.getRawValue().prenom != "" &&
        this.form.getRawValue().nom != "" &&
        this.form.getRawValue().tlphn1 != "" &&
        this.form.getRawValue().dateI != "" &&
        this.form.getRawValue().observation != "" &&
        this.form.getRawValue().grade != "" &&
        this.form.getRawValue().groupe != "" &&
        this.form.getRawValue().saison != "" &&
        Number(this.form.getRawValue().cotisation).toString()!="")
      {
        if(this.informationParentalRequired){
          if(
            this.form.getRawValue().nomP != "" &&
            this.form.getRawValue().prenomP != "" &&
            this.form.getRawValue().tlphn1P != "" &&
            this.form.getRawValue().emailP != ""
          ){
            this.membreService.addMambre(Number(this.cookie.get('idPres')),data).subscribe(
              (res:any)=>{
                console.log(res)
                this._success="Membre a ??t?? bien ajout?? !";
                this._error="";
              },
              error=>{
                this._success="";
                this._error=error.error.message;
              }
            )
          }else{
            this._success="";
            this._error="Merci de remplir les informations des parents";
          }
        }else{
          this.membreService.addMambre(Number(this.cookie.get('idPres')),data).subscribe(
            (res:any)=>{
              this._success="Membre a ??t?? bien ajout?? !";
              this._error="";
            },
            error=>{
              this._success="";
              this._error=error.error.message;
            }
          )
        }
      }else{
        this._success="";
        this._error="Merci de remplir tous les champs correctement";
      }
  }
  Categories : Array<any>=[];
  Activities : Array<any>=[];
  Saisons: Array<any>=[];

  ngOnInit(): void {
    this.service.getCategories().subscribe((response: any) =>{
      this.Categories=response;
     });
     this.activService.getActivites().subscribe((response: any) =>{
      this.Activities=response;     
    });
    this.SaisonsService.getSaisonValid().subscribe((response: any) =>{
      this.Saisons=response[0];  
      console.log(response[0])   
    });
    };



    errorAlert(){
      this._error="";
    }
    successAlert(){
      this._success="";
    }
   

}
