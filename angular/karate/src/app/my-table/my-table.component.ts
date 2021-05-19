import { ElementRef } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';



const USER_INFO: elem[] = [
  {id: 1, licenceFFK:2332, nom: 'TETOUAN',prenom:'Z',dateNaissance:'23/10/1992',genre:'Homme',categorie:'Minipoussins',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 2, licenceFFK:5332, nom: 'Aydrogen',prenom:'G',dateNaissance:'23/10/1992',genre:'Homme',categorie:'Minipoussins',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:1},
  {id: 3, licenceFFK:332, nom: 'Bydrogen',prenom:'H',dateNaissance:'23/10/1992',genre:'Homme',categorie:'Minipoussins',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:33},
  {id: 4, licenceFFK:88332, nom: 'Cydrogen',prenom:'Y',dateNaissance:'23/10/1992',genre:'Homme',categorie:'Poussins',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:55},
  {id: 5, licenceFFK:232, nom: 'Drogen',prenom:'T',dateNaissance:'23/10/1992',genre:'Homme',categorie:'pupilles',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 6, licenceFFK:1332, nom: 'Eydrogen',prenom:'A',dateNaissance:'23/10/1992',genre:'Femme',categorie:'Benjamins',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:0},
  {id: 7, licenceFFK:32, nom: 'Hydrogen',prenom:'J',dateNaissance:'23/10/1992',genre:'Homme',categorie:'Minimes',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 8, licenceFFK:22332, nom: 'Hydrogen',prenom:'I',dateNaissance:'23/10/1992',genre:'Homme',categorie:'Cadets',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 9, licenceFFK:238832, nom: 'Hydrogen',prenom:'Q',dateNaissance:'23/10/1992',genre:'Femme',categorie:'Juniors',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 10, licenceFFK:32332, nom: 'Hydrogen',prenom:'P',dateNaissance:'23/10/1992',genre:'Homme',categorie:'Espoirs',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 11, licenceFFK:21132, nom: 'Hydrogen',prenom:'VV',dateNaissance:'23/10/1992',genre:'Homme',categorie:'Seniors',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 12, licenceFFK:23332, nom: 'Rydrogen',prenom:'N',dateNaissance:'23/10/1992',genre:'Homme',categorie:'Seniors',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 13, licenceFFK:24332, nom: 'Wydrogen',prenom:'Z',dateNaissance:'23/10/1992',genre:'Homme',categorie:'Seniors',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 14, licenceFFK:323332, nom: 'Oydrogen',prenom:'U',dateNaissance:'23/10/1992',genre:'Homme',categorie:'Seniors',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
];

const USER_SCHEMA = {
  "id": "number",
  "licenceFFK": "number",
  "nom": "string",
  "prenom": "string",
  "dateNaissance": "string",
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
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements AfterViewInit {

  displayedColumns: string[] = ["id",
    "licenceFFK",
    "nom",
    "prenom",
    "dateNaissance",
    "genre",
    "categorie",
    "adresse",
    "tlphn1",
    "tlphn2",
    "email",
    "activites",
    "nbInscritsFamille", '$$edit'];


  filter = { Homme: true, Femme: true };
  filter2 = { Minipoussins: true,
    Poussins: true,
    pupilles: true,
    Benjamins: true,
    Minimes: true,
    Cadets: true,
    Juniors: true,
    Espoirs: true,
    Seniors: true};
  filteredProducts = USER_INFO;

  filterChange() {
    this.filteredProducts = USER_INFO.filter(x =>
     (x.genre === 'Homme' && this.filter.Homme)
      || (x.genre === 'Femme' && this.filter.Femme)
    );
    this.dataSource = new MatTableDataSource<elem>(this.filteredProducts);
  }

  filterChange2() {
    this.filterChange();

    this.filteredProducts = this.filteredProducts.filter(x =>
      (x.categorie === 'Minipoussins' && this.filter2.Minipoussins)
      || (x.categorie === 'Poussins' && this.filter2.Poussins)
      || (x.categorie === 'pupilles' && this.filter2.pupilles)
      || (x.categorie === 'Benjamins' && this.filter2.Benjamins)
      || (x.categorie === 'Minimes' && this.filter2.Minimes)
      || (x.categorie === 'Cadets' && this.filter2.Cadets)
      || (x.categorie === 'Juniors' && this.filter2.Juniors)
      || (x.categorie === 'Espoirs' && this.filter2.Espoirs)
      || (x.categorie === 'Seniors' && this.filter2.Seniors)

    );
    this.dataSource = new MatTableDataSource<elem>(this.filteredProducts);
  }


  title = 'angular-app';
  fileName= 'karte-club.xlsx';
  membres=USER_INFO;
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(this.table.nativeElement);
    ws['!cols'] = [];
    ws['!cols'][13] = { hidden: true };

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  //@ts-ignore
  @ViewChild('TABLE') table: ElementRef;
  exportAsExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }
  dataSource = new MatTableDataSource<elem>(USER_INFO);
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
  constructor() {
  }
  ngOnInit(){
  }



}

export interface elem {
  id: number;
  licenceFFK: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  genre: string;
  categorie: string;
  adresse: string;
  tlphn1: string;
  tlphn2: string;
  email: string;
  activites: string;
  nbInscritsFamille: number;
}

