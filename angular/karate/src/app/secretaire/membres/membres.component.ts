import { trigger, state, style, transition, animate } from '@angular/animations';
import { ElementRef, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { CategoriesService } from 'src/app/Services/Categorie.service';
import { MembresService } from 'src/app/Services/membres.service';
import * as XLSX from 'xlsx';
import {MatSort} from '@angular/material/sort';
import { ActivitesService } from 'src/app/Services/activites.service';
import { DatePipe, formatDate } from '@angular/common';
import { TableUtil } from "../../TableUtil";
import { SaisonService } from 'src/app/Services/saison.service';





interface Categorie{
  id:number,
  nomCategorie:string,
  Description:string
};
interface groupe{
  NomGroupe:string;
}
interface membregroup{
  Groupe:groupe
};


const USER_SCHEMA = {
  "id": "number",
  "Cotisation": "number",
  "Nom": "string",
  "Prenom": "string",
  "DateNaissance": "date",
  "Genre": "string",
  "categorie": "string",
  "Adresse": "string",
  "tlphn1": "string",
  "tlphn2": "string",
  "Email": "email",
  "Activites": "string",
  "DateInscription":"date",
};

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css'],

})
export class MembresComponent implements OnInit, AfterViewInit {
  expandedElement!: elem | null;
  USER_INFO: elem[] = [];
  dataSource = new MatTableDataSource<elem>(this.USER_INFO);
  Categories: Array<any> = [];
  Activities: Array<any> = [];
  Saisons: Array<any>=[];
  searchForm: FormGroup ;
  Nom:string = '' ;
  Prenom:string = '';
  FFK:string = '';
  Tout:string = '';
   _success:string="";
  _error:string="";
  constructor(private saisonService:SaisonService,private service: MembresService , private servicec: CategoriesService , private cookie:CookieService, private activite:ActivitesService){

    this.searchForm = new FormGroup({
      Nom: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      Prenom: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      FFK: new FormControl('', Validators.pattern('^[a-zA-Z0-9 ]+$')),
      Tout: new FormControl('', Validators.pattern('^[a-zA-Z0-9 ]+$'))
    });
  }

   //@ts-ignore
   @ViewChild(MatSort) sort: MatSort;

  ngOnInit(){
    this.service.getMembres().subscribe((response: any) =>{
      this.USER_INFO=response;
      let activitie:string="";
      let selected:Array<string>=[]
          this.USER_INFO.forEach((element:any) => {
            element.GroupesMembre.forEach((groupe:any) => {
              activitie += groupe.Groupe.nomGroupe+",";
            });
            element.GroupesMembre=activitie.slice(0, activitie.length-1);;
            element.categorie=element.categorie.nomCategorie;
            activitie="";
          });
      this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.getFilterPredicate();
      this.dataSource.sort = this.sort;
    });

    this.activite.getActivites().subscribe((response:any)=>{
      this.Activities=response;
    })

    this.servicec.getCategories().subscribe((response: any) =>{
      this.Categories=response;
    });
    this.saisonService.getSaison().subscribe((response: any) =>{
      this.Saisons=response[0]; 
    });
  };

  displayedColumns: string[] = ["id","NumLicenceFFK","Nom","Prenom","DateNaissance","Genre","categorie","GroupesMembre","Adresse","Telephone1","Telephone2","Email","Cotisation","DateInscription","Grade","NomParents","PrenomParents","TelephoneParents1","TelephoneParents2","EmailParents","Observation", '$$edit'];

  dataSchema:any = USER_SCHEMA;
  title = 'angular-app';
  fileName= 'karte-club.xlsx';


 exportArray() {
    const onlyNameAndSymbolArr: Partial<exportp>[] = this.USER_INFO.map((x:any) => ({
      NumLicenceFFK: x.NumLicenceFFK,
      Nom: x.Nom,
      Prenom: x.Prenom,
      DateNaissance: x.DateNaissance,
      Genre: x.Genre,
      categorie: x.categorie,
      Activite: x.GroupesMembre,
      Adresse: x.Adresse,
      Telephone1: x.Telephone1,
      Telephone2: x.Telephone2,
      Email: x.Email,
      Cotisation: x.Cotisation,
      DateInscription: x.DateInscription,
      Grade: x.Grade,
      NomParents: x.NomParents,
      PrenomParents: x.PrenomParents,
      TelephoneParents1: x.TelephoneParents1,
      TelephoneParents2: x.TelephoneParents2,
      EmailParents: x.EmailParents,
      Observation: x.Observation,
    }));
    TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "Membres");
  }

  exportexcel(): void
  {
    this.exportArray()

  }
  isValid(str:string) {
    return !/[~`!@#$%\^&*()+=\-\[\]\\';,.^????/{}|\\":<>\?]/g.test(str);
  }


  edit(element:any){

    const listGroupe:Array<membregroup>=[]
    if(Array.isArray(element.GroupesMembre)){
      element.GroupesMembre.forEach((element:string) => {
        listGroupe.push({Groupe:{NomGroupe:element}})
      });
    }else{
      listGroupe.push({Groupe:{NomGroupe:element.GroupesMembre}})
    }
    const data={
      id:element.id,
      Adresse:element.Adresse,
      Cotisation:Number(element.Cotisation),
      DateInscription:element.DateInscription,
      DateNaissance:element.DateNaissance,
      Email:element.Email,
      Genre:element.Genre,
      Grade:element.Grade,
      GroupesMembre:listGroupe,
      Nom:element.Nom,
      NumLicenceFFK:element.NumLicenceFFK,
      Observation:element.Observation,
      Prenom:element.Prenom,
      Telephone1:element.Telephone1,
      Telephone2:element.Telephone2,
      NomParents: element.NomParents,
      PrenomParents: element.PrenomParents,
      TelephoneParents1: element.TelephoneParents1,
      TelephoneParents2: element.TelephoneParents2,
      EmailParents: element.EmailParents,
      categorie: { nomCategorie: element.categorie },

    }

    if(
      data.Adresse !="" &&
      data.Cotisation &&
      data.DateInscription !="" &&
      data.DateNaissance !="" &&
      data.Email !="" &&
      data.Genre !="" &&
      data.Grade !="" &&
      data.GroupesMembre.length &&
      data.Nom !="" &&
      this.isValid(data.NumLicenceFFK) &&
      data.Observation !="" &&
      data.Prenom !="" &&
      data.Telephone1 !="" &&
      data.categorie.nomCategorie !=""
    ){

      let date1 =formatDate(new Date(), 'yyyy/MM/dd', 'fr');
      let date2 = new Date(date1);
      let date3 = new Date(element.DateNaissance);
      let diff = date2.getTime() - date3.getTime();
      let years = (diff / (1000*3600*24))/365;
      if(years>18){
        this.service.updateMembre(Number(this.cookie.get('idSec')),data).subscribe((res:any)=>{
          this._error="";
          this._success=res.message
        },
        error=>{
          this._success=""
          this._error=error.error.message
        }
        );

      }
      else{
        if(
          data.NomParents  &&
          data.PrenomParents  &&
          data.TelephoneParents1  &&
          data.EmailParents  
        ){
          this.service.updateMembre(Number(this.cookie.get('idSec')),data).subscribe((res:any)=>{
            this._error="";
            this._success=res.message
          },
          error=>{
            this._success=""
            this._error=error.error.message
          });
        }else{
          this._error="Ce membre est mineur! merci de remplir les informations des parents";
        }
        
      }
    }else{
      this._error="Merci de remplir correctement tous les champs";
    }

  }

  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filterValue2 = filterValue + '$' +'';
    this.dataSource.filter = filterValue2.trim().toLowerCase();
  }

  applyFilterbis() {
    const n = this.searchForm.getRawValue().Nom;
    const p = this.searchForm.getRawValue().Prenom;
    const f = this.searchForm.getRawValue().FFK;
    const t = this.searchForm.getRawValue().Tout;
    this.Nom = n === null ? '' : n;
    this.Prenom = p === null ? '' : p;
    this.FFK = f === null ? '' : f;
    this.Tout = t === null ? '' : t;

    const filterValue = this.Nom + '$' + this.Prenom + '$' + this.FFK + '$' + this.Tout;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getFilterPredicate() {
    return (row: elem, filters: string) => {
      const filterArray = filters.split('$');
      const Nom = filterArray[0];
      const prenom = filterArray[1];
      const ffk = filterArray[2];
      const Tout = filterArray[3];
      const matchFilter = [];
      const colonneN = row.Nom;
      const colonneP = row.Prenom;
      const colonneFFk = row.NumLicenceFFK;
      const colonneT = row.Nom + row.Prenom + row.NumLicenceFFK + row.categorie + row.Genre + row.GroupesMembre + row.Adresse + row.DateNaissance + row.Email + row.Telephone1 + row.Cotisation + row.DateInscription + row.Grade + row.Observation + row.NomParents + row.PrenomParents + row.EmailParents +row.TelephoneParents1 + row.TelephoneParents2 + row.TelephoneParents2 ;
      const customFilterN = colonneN.toLowerCase().includes(Nom);
      const customFilterP = colonneP.toLowerCase().includes(prenom);
      const customFilterF = colonneFFk.toLowerCase().includes(ffk);
      const customFilterT = colonneT.toLowerCase().includes(Tout);

      matchFilter.push(customFilterN);
      matchFilter.push(customFilterP);
      matchFilter.push(customFilterF);
      matchFilter.push(customFilterT);
      return matchFilter.every(Boolean);
    };
  }
  delete(Nom:any,Prenom:any,index:any,id:any){
    if(confirm("Est ce que vous voulez vraiment supprimer le membre \" "+Prenom+" "+Nom+" \"")) {
      this.service.deleteMembre(Number(id),Number(this.cookie.get('idSec'))).subscribe((res:any)=>{
          if(res.success){
            this.service.getMembres().subscribe((response: any) =>{
              this.USER_INFO=response;
              let activitie:string="";
                  this.USER_INFO.forEach((element:any) => {
                    element.GroupesMembre.forEach((groupe:any) => {
                      activitie += groupe.Groupe.nomGroupe+",";
                    });
                    element.GroupesMembre=activitie.slice(0, activitie.length-1);;
                    element.categorie=element.categorie.nomCategorie;
                    activitie="";
                  });
              this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
              this.dataSource.paginator = this.paginator;
              this.dataSource.filterPredicate = this.getFilterPredicate();
              this.dataSource.sort = this.sort;
            });
            this._error="";
            this._success=res.message
          }
        },
        error=>{
          this._success=""
        this._error=error.error.message

        });

    }
  }

  errorAlert(){
    this._error="";
  }
  successAlert(){
    this._success="";
  }
  GroupeMembre:Array<groupeMembre>=[]
  selected:boolean=true
  excelFile:any;
  onFileChange(evt: any,label:any){
    label.innerHTML=this.excelFile=evt.target.value.split('\\')[2];
    this.selected=false;
  } 

  upload(){
    if(this.excelFile){
      this.service.UploadFile(Number(this.cookie.get('idSec')),{thePath:this.excelFile}).subscribe((res:any)=>{
        this._success=res.message;
        window.location.reload();
      },error=>{
        this._error=error.error.message;
      }
      );
    }
    else{
      this._error="Une erreur est survenue";
    }
  }

  BySaison(saison:any){
    if(Number(saison.value)){
      this.saisonService.getMemberBySaison(Number(saison.value)).subscribe((res:any)=>{
        this.USER_INFO=[];
        res[0].saisonMembres.forEach((element:any) => {
          this.USER_INFO.push(
            {
              id: element.Membre.id,
              NumLicenceFFK: element.Membre.numLicenceFFK,
              Nom: element.Membre.nom,
              Prenom: element.Membre.prenom,
              DateNaissance: element.Membre.dateNaissance,
              Genre: element.Membre.genre,
              categorie: element.Membre.categorie,
              Adresse: element.Membre.adresse,
              Telephone1: element.Membre.telephone1,
              Telephone2: element.Membre.telephone2,
              Email: element.Membre.email,
              Cotisation: element.Membre.cotisation,
              NomParents: element.Membre.nomParents,
              PrenomParents: element.Membre.prenomParents,
              TelephoneParents1: element.Membre.telephoneParents1,
              TelephoneParents2: element.Membre.telephoneParents2,
              EmailParents: element.Membre.emailParents,
              DateInscription: element.Membre.dateInscription,
              Grade: element.Membre.grade,
              Observation: element.Membre.observation,
              GroupesMembre: element.Membre.groupesMembre,
            }
            )
        });
        let activitie:string="";
            this.USER_INFO.forEach((element:any) => {
              element.GroupesMembre.forEach((groupe:any) => {
                activitie += groupe.Groupe.nomGroupe+",";
              });
              element.GroupesMembre=activitie.slice(0, activitie.length-1);;
              element.categorie=element.categorie.nomCategorie;
              activitie="";
            });
        this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.getFilterPredicate();
        this.dataSource.sort = this.sort;
      });
    }
    else{
      this.service.getMembres().subscribe((response: any) =>{
        this.USER_INFO=response;
        let activitie:string="";
            this.USER_INFO.forEach((element:any) => {
              element.GroupesMembre.forEach((groupe:any) => {
                activitie += groupe.Groupe.nomGroupe+",";
              });
              element.GroupesMembre=activitie.slice(0, activitie.length-1);;
              element.categorie=element.categorie.nomCategorie;
              activitie="";
            });
        this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.getFilterPredicate();
        this.dataSource.sort = this.sort;
      });
    }
  }

}


export interface elem {
  id: number;
  NumLicenceFFK: string;
  Nom: string;
  Prenom: string;
  DateNaissance: Date;
  Genre: string;
  categorie: string;
  Adresse: string;
  Telephone1: string;
  Telephone2: string;
  Email: string;
  Cotisation: number;
  NomParents: string;
  PrenomParents: string;
  TelephoneParents1: string;
  TelephoneParents2: string;
  EmailParents: string;
  DateInscription: string;
  Grade: string;
  Observation: string;
  GroupesMembre: any;
}

export class excelData{ 
  NumLicenceFFK: string ="";
  Nom: string | null ="";
  Prenom: string | null ="";
  DateNaissance: Date | null =new Date();
  Genre: string | null ="";
  categorie: any | null ="";
  GroupesMembre: any | null ="";
  Adresse: string | null ="";
  Telephone1: string | null ="";
  Telephone2: string | null ="";
  Email: string | null ="";
  Cotisation: number | null =0;
  NomParents: string | null ="";
  PrenomParents: string | null ="";
  TelephoneParents1: string | null ="";
  TelephoneParents2: string | null ="";
  EmailParents: string | null ="";
  DateInscription: Date | null =new Date();
  Grade: string | null ="";
  Observation: string | null ="";
 }

 export interface exportp {
  id: number;
  NumLicenceFFK: string;
  Nom: string;
  Prenom: string;
  DateNaissance: Date;
  Genre: string;
  categorie: string;
  Groupe: string;
  Adresse: string;
  Telephone1: string;
  Telephone2: string;
  Email: string;
  Cotisation: number;
  NomParents: string;
  PrenomParents: string;
  TelephoneParents1: string;
  TelephoneParents2: string;
  EmailParents: string;
  DateInscription: Date;
  Grade: string;
  Observation: string;
  Activite: any;
}
interface groupeMembre {
  Groupe: {
      nomGroupe:string;
    }
}