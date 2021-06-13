import { HttpClient } from '@angular/common/http';
import { PipeTransform } from '@angular/core';
import { ElementRef, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MembresService } from 'src/app/Services/membres.service';
import * as XLSX from 'xlsx';
import {CategoriesService} from "../../Services/Categorie.service";
import {CookieService} from "ngx-cookie-service";
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatSort} from '@angular/material/sort';
import { ActivitesService } from 'src/app/Services/activites.service';


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
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MembresComponent implements OnInit,AfterViewInit {
  expandedElement!: elem | null;
  USER_INFO: elem[] = [];
  dataSource = new MatTableDataSource<elem>(this.USER_INFO);
  Categories: Array<any> = [];
  Activities: Array<any> = [];
  searchForm: FormGroup ;
  Nom:string = '' ;
  Prenom:string = '';
  FFK:string = '';
  Tout:string = '';
   _success:string="";
  _error:string="";
  constructor(private service: MembresService , private servicec: CategoriesService , private cookie:CookieService, private activite:ActivitesService){
    
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
  };

  displayedColumns: string[] = ["id","NumLicenceFFK","Nom","Prenom","DateNaissance","Genre","categorie","GroupesMembre","Adresse","Telephone1","Telephone2","Email","Cotisation","DateInscription","Grade","Observation", '$$edit'];
  notdisplayedColumns: string[] = ["NomParents","PrenomParents","TelephoneParents1","TelephoneParents2","EmailParents"];
  dataSchema:any = USER_SCHEMA;
  title = 'angular-app';
  fileName= 'karte-club.xlsx';


  exportexcel(): void
  {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    ws['!cols'] = [];
    ws['!cols'][13] = { hidden: true };
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);

  }
  isValid(str:string) {
    return !/[~`!@#$%\^&*()+=\-\[\]\\';,.^ç¤/{}|\\":<>\?]/g.test(str);
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

      this.service.updateMembre(Number(this.cookie.get('idPres')),data).subscribe((res:any)=>{
        this._error="";
        this._success=res.message
      },
      error=>{
        this._success=""
        this._error=error.error.message
      }
      )
      

    }else{
      this._error="veillez remplire correctement tout les champs";
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
      const colonneT = row.Nom + row.Prenom + row.NumLicenceFFK + row.categorie + row.Genre + row.GroupesMembre + row.Adresse + row.DateNaissance + row.Email + row.Telephone1 + row.Cotisation + row.DateInscription + row.Grade + row.Observation;
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
      this.service.deleteMembre(Number(id),Number(this.cookie.get('idPres'))).subscribe((res:any)=>{
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

}


export interface elem {
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
  DateInscription: string;
  Grade: string;
  Observation: string;
  GroupesMembre: any;
}
