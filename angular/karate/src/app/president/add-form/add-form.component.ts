import { Component, OnInit } from '@angular/core';
import { Membre } from '../../membre.model';
import { FormGroup , FormBuilder  ,FormControl , Validators } from '@angular/forms';
import { CategoriesService } from '../../Services/Categorie.service';
import { GroupesService } from 'src/app/Services/groupes.service';
import { MembresService } from 'src/app/Services/membres.service';
import { CookieService } from 'ngx-cookie-service';
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
  constructor(private fb: FormBuilder,private service:CategoriesService, private activService:GroupesService,private membreService:MembresService,private cookie:CookieService) {

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


  Categories : Array<Categorie>=[];
  Activities : Array<any>=[];


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
    }

    if( this.form.getRawValue().adresse != "" &&
        this.form.getRawValue().licenceFFK != "" &&
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
        this.form.getRawValue().cotisation != "" 
      )
      {
        this.membreService.addMambre(Number(this.cookie.get('idPres')),data).subscribe(
          (res:any)=>{
            this._success="Membre ajouté avec succes !";
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
    console.log(this.form.getRawValue());
  }


  ngOnInit(): void {
    this.service.getCategories().subscribe((response: any) =>{
      console.log(response);
      this.Categories=response;
     });
     this.activService.getGroupes().subscribe((response: any) =>{
      console.log(response);
      this.Activities=response;
     });
    };
    


  
}
