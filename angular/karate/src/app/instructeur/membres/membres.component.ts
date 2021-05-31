import { ElementRef, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MembresService } from 'src/app/Services/membres.service';
import * as XLSX from 'xlsx';



 

const USER_SCHEMA = {
  "id": "number",
  "licenceFFK": "number",
  "nom": "string",
  "prenom": "string",
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
export class MembresComponent implements OnInit,AfterViewInit {
  USER_INFO: elem[] = [];
  dataSource = new MatTableDataSource<elem>(this.USER_INFO);
  groupes!: any[];
   constructor(private service: MembresService){}
   ngOnInit(){
         this.service.getMembres().subscribe((response: any) =>{
           console.log(response);
           
           this.USER_INFO=response;
           this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
           this.dataSource.paginator = this.paginator;
          });
           };


           displayedColumns: string[] = ["id",
           "NumLicenceFFK",
           "Nom",
           "Prenom",
           "DateNaissance",
           "Genre",
           "Categorie",
           "Adresse",
           "Telephone1",
           "Telephone2",
           "Email",
           "NomParents",
           "PrenomParents",
           "TelephoneParents1",
           "TelephoneParents2",
           "EamilParents",
           "Cotisation",
           "DateInscription",
           "Grade",
           "Observation",
           "categorie"];


  title = 'angular-app';
  fileName= 'karte-club.xlsx';
 
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    ws['!cols'] = [];
    ws['!cols'][13] = { hidden: true };
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

  dataSchema:any = USER_SCHEMA;
  edit(element:any){
    console.log(element);
  }

  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  categorie: any;
  
}

