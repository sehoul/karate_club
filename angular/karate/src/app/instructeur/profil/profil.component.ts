import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AdministrationService } from 'src/app/Services/administration.service';
import { CategoriesService } from 'src/app/Services/Categorie.service';
import { GroupesService } from 'src/app/Services/groupes.service';
import { InstructeurService } from 'src/app/Services/instructeur.service';
import { MembresService } from 'src/app/Services/membres.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

 
  formAA: FormGroup;
  _success:string="";
  _error:string="";

  constructor(private fb: FormBuilder,private service:CategoriesService, private activService:GroupesService,private instructeur:InstructeurService,private cookie:CookieService) {
    this.formAA=this.fb.group({
      LicenceIns:  new FormControl('', [Validators.required]),
      NomIns:  new FormControl('', [Validators.required]),
      PrenomIns:  new FormControl('', [Validators.required]),
      MailIns:  new FormControl('', [Validators.required]),
      tlphn1:  new FormControl('', [Validators.required]),
      tlphn2:  new FormControl('', [Validators.required]),
      genre:  new FormControl('', [Validators.required]),
      adresse:  new FormControl('', [Validators.required]),
      grade:  new FormControl('', [Validators.required]),
      categorie:  new FormControl('', [Validators.required]),
      observation:  new FormControl('', [Validators.required]),
      dateN:  new FormControl('', [Validators.required]),
     
     },{ 
    
    });
   }


   get LicenceIns() : any {   return this.formAA.get('LicenceIns');}
   get NomIns() : any {   return this.formAA.get('NomIns');}
   get PrenomIns() : any {   return this.formAA.get('PrenomIns');}
   get MailIns() : any {   return this.formAA.get('MailIns');}
   get TlphnIns() : any {   return this.formAA.get('TlphnIns');}
   get genre() : any {   return this.formAA.get('genre');}
   get tlphn1() : any {   return this.formAA.get('tlphn1');}
   get tlphn2() : any {   return this.formAA.get('tlphn2');}
   get adresse() : any {   return this.formAA.get('adresse');}
   get grade() : any {   return this.formAA.get('grade');}
   get categorie() : any {   return this.formAA.get('categorie');}
   get observation() : any {   return this.formAA.get('observation');}
   get dateN() : any {   return this.formAA.get('dateN');}



   setLicenceIns(value:string){   this.formAA.get('LicenceIns')?.setValue(value);}
   setNomIns(value:string){   this.formAA.get('NomIns')?.setValue(value);}
   setPrenomIns(value:string){   this.formAA.get('PrenomIns')?.setValue(value);}
   setMailIns(value:string){   this.formAA.get('MailIns')?.setValue(value);}
   setTlphnIns(value:string){   this.formAA.get('TlphnIns')?.setValue(value);}
   setgenre(value:string){   this.formAA.get('genre')?.setValue(value);}
   settlphn1(value:string){   this.formAA.get('tlphn1')?.setValue(value);}
   settlphn2(value:string){   this.formAA.get('tlphn2')?.setValue(value);}
   setadresse(value:string){   this.formAA.get('adresse')?.setValue(value);}
   setgrade(value:string){   this.formAA.get('grade')?.setValue(value);}
   setcategorie(value:string){   this.formAA.get('categorie')?.setValue(value);}
   setobservation(value:string){   this.formAA.get('observation')?.setValue(value);}
   setdateN(value:string){   this.formAA.get('dateN')?.setValue(value);}

  Categories : Array<any>=[];
  Activities : Array<any>=[];

  submit() {
    const data={
      Nom:this.formAA.getRawValue().NomIns,
      Prenom:this.formAA.getRawValue().PrenomIns,
      Email:this.formAA.getRawValue().MailIns,
      Tel:this.formAA.getRawValue().TlphnIns,
      Licence:this.formAA.getRawValue().LicenceIns,
      genre:this.formAA.getRawValue().genre,
      adresse:this.formAA.getRawValue().adresse,
      grade:this.formAA.getRawValue().grade,
      activite:this.formAA.getRawValue().activite,
      categorie:this.formAA.getRawValue().categorie,
      observation:this.formAA.getRawValue().observation,
      dateN:this.formAA.getRawValue().dateN,
    }
    if(data.Nom!="" && data.Prenom!="" && data.Tel!="" && data.Email!="" && data.Licence!="" && data.genre!=""&& data.adresse!="" && data.grade!="" && data.activite!=""&& data.categorie!=""&& data.observation!="" && data.dateN!=""){
    {
      this._success="";
      this._error="Merci de remplir tous les champs";
    }

    }
  }

  ngOnInit(): void {
    this.service.getCategories().subscribe((response: any) =>{
      this.Categories=response;
     });
     this.activService.getGroupes().subscribe((response: any) =>{
      this.Activities=response;
     });
     this.instructeur.getProfile(Number(this.cookie.get('idInst'))).subscribe((res:any)=>{

        this.setLicenceIns(res.NumLicenceFFK);
        this.setNomIns(res.Nom);

     },error=>{

     });
    }
}
