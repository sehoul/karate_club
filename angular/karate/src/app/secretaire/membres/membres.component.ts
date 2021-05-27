import { ElementRef, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MembresService } from 'src/app/Services/membres.service';
import * as XLSX from 'xlsx';





const USER_SCHEMA = {
  "id": "number",
  "licenceFFK": "number",
  "Nom": "string",
  "Prenom": "string",
  "dateNaissance": "date",
  "genre": "string",
  "categorie": "string",
  "adresse": "string",
  "tlphn1": "string",
  "tlphn2": "string",
  "email": "string",
  "activites": "string",
  "nbInscritsFamille": "number"


};

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit, AfterViewInit {
  USER_INFO: elem[] = [];
  dataSource = new MatTableDataSource<elem>(this.USER_INFO);
  searchForm: FormGroup ;
  Nom:string = '' ;
  Prenom:string = '';
  constructor(private service: MembresService){
    this.searchForm = new FormGroup({
      Nom: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      Prenom: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
    });
   }
   ngOnInit(){
         this.service.getMembres().subscribe((response: any) =>{
           this.USER_INFO=response;
           this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
           this.dataSource.paginator = this.paginator;
           this.dataSource.filterPredicate = this.getFilterPredicate();
          });
   }
  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ["id","NumLicenceFFK","Nom","Prenom","DateNaissance","Genre","Categorie","Adresse","Telephone1","Telephone2","Email","NomParents","PrenomParents","TelephoneParents1","TelephoneParents2","EamilParents","Cotisation","DateInscription","Grade","Observation","categorie", '$$edit'];
  dataSchema:any = USER_SCHEMA;
  
  exportexcel(): void
  {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    ws['!cols'] = [];
    ws['!cols'][13] = { hidden: true };
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, "karte-club.xlsx");
  }

  applyFilterbis() {
    const n = this.searchForm.getRawValue().Nom;
    const p = this.searchForm.getRawValue().Prenom;

    this.Nom = n === null ? '' : n;
    this.Prenom = p === null ? '' : p;

    const filterValue = this.Nom + '$' + this.Prenom;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  getFilterPredicate() {
    return (row: elem, filters: string) => {
      const filterArray = filters.split('$');
      const Nom = filterArray[0];
      const prenom = filterArray[1];
      const matchFilter = [];
      const colonneN = row.Nom;
      const colonneP = row.Prenom;
      const customFilterN = colonneN.toLowerCase().includes(Nom);
      const customFilterP = colonneP.toLowerCase().includes(prenom);
      matchFilter.push(customFilterN);
      matchFilter.push(customFilterP);
      return matchFilter.every(Boolean);
    };
  }

  edit(element:any){
    console.log(element);

  }
  



}

export interface elem {
  id: number;
  NumLicenceFFK: string;
  Nom: string;
  Prenom: string;
  DateNaissance: Date;
  Genre: string;
  Groupe: string;
  Categorie: string;
  Adresse: string;
  Telephone1: string;
  Telephone2: string;
  Email: string;
  NomParents: string;
  PrenomParents: string;
  TelephoneParents1: string;
  TelephoneParents2: string;
  EamilParents: string;
  Cotisation: number;
  DateInscription: Date;
  Grade: string;
  Observation: string;
  categorie: any;}
  