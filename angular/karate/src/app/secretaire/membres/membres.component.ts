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

    displayedColumns: string[] = ["id","NumLicenceFFK","Nom","Prenom","DateNaissance","Genre","categorie","GroupesMembre","Adresse","Telephone1","Telephone2","Email","Cotisation","DateInscription","Grade","NomParents","PrenomParents","TelephoneParents1","TelephoneParents2","EmailParents","Observation", '$$edit'];
    //notdisplayedColumns: string[] = [];
    dataSchema:any = USER_SCHEMA;
    title = 'angular-app';
    fileName= 'karte-club.xlsx';


    exportexcel(): void
    {
      let element = document.getElementById('excel-table');
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
      ws['!cols'] = [];
      ws['!cols'][0] = { hidden: true };
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
            this.service.updateMembre(Number(this.cookie.get('idPres')),data).subscribe((res:any)=>{
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
        const colonneT = row.Nom + row.Prenom + row.NumLicenceFFK + row.categorie + row.Genre + row.GroupesMembre + row.Adresse + row.DateNaissance + row.Email + row.Telephone1 + row.Cotisation + row.DateInscription + row.Grade + row.Observation + row.NomParents + row.PrenomParents + row.EmailParents + row.TelephoneParents1 + row.TelephoneParents2 + row.Telephone2;
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

    excel!:excelData
    GroupeMembre:Array<groupeMembre>=[]
    data!: [][];
    onFileChange(evt: any,label:any){
      label.innerHTML=evt.target.value.split('\\')[2];
      const target : DataTransfer = <DataTransfer>(evt.target);
  
      const reader: FileReader = new FileReader();
  
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
  
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary'});
  
        const wsname : string = wb.SheetNames[0];
  
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        console.log()
  
        this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
        let i=0
        this.data.forEach((element:any) => {
          if(i && element.length){ 
            element[7].split(',').forEach((groupe: string ) => {
              this.GroupeMembre.push({Groupe:{nomGroupe:groupe}});
            });
            this.excel=new excelData();
            this.excel={
              NumLicenceFFK: element[1]?element[1]+"":"",
              Nom: element[2]?element[2]+"":"",
              Prenom: element[3]?element[3]+"":"",
              DateNaissance:new Date(element[4]),
              Genre: element[5]?element[5]+"":"",
              categorie: {nomCategorie:element[6]?element[6]+"":""},
              GroupesMembre: this.GroupeMembre?this.GroupeMembre:"",
              Adresse: element[8]?element[8]+"":"",
              Telephone1: element[9]?element[9]+"":"",
              Telephone2: element[10]?element[10]+"":"",
              Email: element[11]?element[11]+"":"",
              Cotisation: Number(element[12]),
              DateInscription:new Date(element[13]),
              Grade: element[14]?element[14]+"":"",
              NomParents: element[15]?element[15]+"":"",
              PrenomParents: element[16]?element[16]+"":"",
              TelephoneParents1: element[17]?element[17]+"":"",
              TelephoneParents2: element[18]?element[18]+"":"",
              EmailParents: element[19]?element[19]+"":"",
              Observation: element[20]?element[20]+"":""
            };

              this.service.MambreExcel(Number(this.cookie.get('idSec')),this.excel).subscribe((res:any)=>{
              },
              error=>{
                this._success=""
                this._error=error.error.message
                
              });
              console.log(this.excel)
          }
          this.GroupeMembre=[];
          i++;
        });
        this._error="";
        this._success="Importation terminée !"
      };
  
     // console.log(target.files.length);
  
      reader.readAsBinaryString(target.files[0]);  
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


  interface groupeMembre {
    Groupe: {
        nomGroupe:string;
      }
}