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
   get dateN() : any {   return this.formAA.get('dateN');}



   setLicenceIns(value:string){   this.formAA.get('LicenceIns')?.setValue(value);}
   setNomIns(value:string){   this.formAA.get('NomIns')?.setValue(value);}
   setPrenomIns(value:string){   this.formAA.get('PrenomIns')?.setValue(value);}
   setMailIns(value:string){   this.formAA.get('MailIns')?.setValue(value);}
   setgenre(value:string){   this.formAA.get('genre')?.setValue(value);}
   settlphn1(value:string){   this.formAA.get('tlphn1')?.setValue(value);}
   settlphn2(value:string){   this.formAA.get('tlphn2')?.setValue(value);}
   setadresse(value:string){   this.formAA.get('adresse')?.setValue(value);}
   setgrade(value:string){   this.formAA.get('grade')?.setValue(value);}
   setcategorie(value:string){   this.formAA.get('categorie')?.setValue(value);}
   setdateN(value:string){   this.formAA.get('dateN')?.setValue(value);}

  Categories : Array<any>=[];
  Activities : Array<any>=[];

  isValid(str:string) {
    return !/[~`!@#$%\^&*()+=\-\[\]\\';,.^????/{}|\\":<>\?]/g.test(str);
  }
  submit() {
      const data={
        Nom:this.formAA.getRawValue().NomIns,
        Prenom:this.formAA.getRawValue().PrenomIns,
        Email:this.formAA.getRawValue().MailIns,
        Tel1:this.formAA.getRawValue().tlphn1,
        Tel2:this.formAA.getRawValue().tlphn2,
        NumLicenceFFK:this.formAA.getRawValue().LicenceIns,
        Genre:this.formAA.getRawValue().genre,
        adresse:this.formAA.getRawValue().adresse,
        grade:this.formAA.getRawValue().grade,
        CategorieFFK:this.formAA.getRawValue().categorie,
        dateNaissance:this.formAA.getRawValue().dateN,
      }
      if(data.Nom!="" && data.Prenom!="" && data.Tel1!="" && data.Email!="" && this.isValid(data.NumLicenceFFK) && data.Genre!=""&& data.adresse!="" && data.grade!="" && data.CategorieFFK!="" && data.dateNaissance!=""){
        this.instructeur.updateProfile(Number(this.cookie.get('idInst')),data).subscribe((res:any)=>{
          this._success=res.message;
          this._error="";
        },error=>{
          this._success="";
          this._error=error.error.message;
        });
      
      }else{
        this._success="";
        this._error="Merci de remplir tous les champs";
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

        if(res.NumLicenceFFK){this.setLicenceIns(res.NumLicenceFFK); }
        if(res.Nom)           this.setNomIns(res.Nom);       
        if(res.Prenom)        this.setPrenomIns(res.Prenom);    
        if(res.Email)         this.setMailIns(res.Email);      
        if(res.tel1)          this.settlphn1(res.tel1);       
        if(res.tel2)          this.settlphn2(res.tel2);       
        if(res.Genre)         this.setgenre(res.Genre);        
        if(res.Adresse)       this.setadresse(res.Adresse);     
        if(res.Grade)         this.setgrade(res.Grade);        
        if(res.CategorieFFK)  this.setcategorie(res.CategorieFFK); 
        if(res.dateNaissance) this.setdateN(res.dateNaissance); 

     },error=>{

     });
    }
}
