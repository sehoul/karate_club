import { ElementRef, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { CategoriesService } from 'src/app/Services/Categorie.service';
import { MembresService } from 'src/app/Services/membres.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as XLSX from 'xlsx';
import {MatSort} from '@angular/material/sort';

interface Categorie{
  id:number,
  nomCategorie:string,
  Description:string
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
  Categories: Array<Categorie> = [];
  searchForm: FormGroup ;
  Nom:string = '' ;
  Prenom:string = '';
  Tout:string = '';
  FFK:string = '';
  constructor(private service: MembresService , private servicec: CategoriesService , private cookie:CookieService){
    this.searchForm = new FormGroup({
      Nom: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      Prenom: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      FFK: new FormControl('', Validators.pattern('^[a-zA-Z0-9 ]+$')),
      Tout: new FormControl('', Validators.pattern('^[a-zA-Z0-9 ]+$'))
    });
  }
  ngOnInit(){
    this.service.getMembres().subscribe((response: any) =>{
      this.USER_INFO=response;
      let activitie:string="";
          this.USER_INFO.forEach((element:any) => {
            element.membreActivites.forEach((activitie_element:any) => {
              activitie += activitie_element.Avtivite.nomActivite+",  ";
            });
            element.membreActivites=activitie;
            activitie="";
          });
      this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.getFilterPredicate();
      this.dataSource.sort = this.sort;
 
     
    });
    

    this.servicec.getCategories().subscribe((response: any) =>{
      console.log(response);
      this.Categories=response;
    });
  };

 
  displayedColumns: string[] = ["id","NumLicenceFFK","Nom","Prenom","DateNaissance","Genre","categorie","Adresse","Telephone1","Telephone2","Email","Cotisation","DateInscription","Grade","Observation"];
  notdisplayedColumns: string[] = ["NomParents","PrenomParents","TelephoneParents1","TelephoneParents2","EmailParents","membreActivites"];
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

  edit(element:any){
    console.log(element);

  }

  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  
  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

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

    const filterValue = this.Nom + '$' + this.Prenom + '$' + this.FFK+ '$' + this.Tout;
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
      const colonneT = row.Nom + row.Prenom + row.NumLicenceFFK + row.categorie + row.Genre + row.membreActivites + row.Adresse + row.DateNaissance + row.Email + row.Telephone1 + row.Cotisation + row.DateInscription + row.Grade + row.Observation;
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
  membreActivites: any;
}
