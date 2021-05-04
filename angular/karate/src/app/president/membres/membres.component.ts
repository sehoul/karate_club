import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {

  fileName= 'ExcelSheet.xlsx';

  membres = [

    {
    "id":1,
    "LicenceFFK": 122,
    "NomPrenom": "Leanne Graham", 
    "DateNaissance": "21/02/1999",
    "Genre": "Homme",
    "Categorie": "Cadets",
    "Adresse": "1 avenue ",
    "Tlphn1": "0601020304",
    "Tlphn2": "0601020304",
    "Email": "Sincere@april.biz",
    "Activites": "Karaté",
    "NbInscritsFamille": "0"
    
    },
    
    {
      "id":2,
      "LicenceFFK": 123,
      "NomPrenom": "Alain gourmet", 
      "DateNaissance": "21/02/1999",
      "Genre": "Homme",
      "Categorie": "Cadets",
      "Adresse": "1 avenue ",
      "Tlphn1": "0601020304",
      "Tlphn2": "0601020304",
      "Email": "Alain@april.biz",
      "Activites": "Karaté self-defense",
      "NbInscritsFamille": "3"
    
    },
    
    {
      "id":3,
      "LicenceFFK": 143,
      "NomPrenom": "Elodie", 
      "DateNaissance": "21/02/1999",
      "Genre": "Femme",
      "Categorie": "Cadets",
      "Adresse": "1 avenue ",
      "Tlphn1": "0601020304",
      "Tlphn2": "0601020304",
      "Email": "Sincere@april.biz",
      "Activites": "Karaté",
      "NbInscritsFamille": "20"
    
    },
    
    {  "id":4,
      "LicenceFFK": 111,
      "NomPrenom": "mathieu az", 
      "DateNaissance": "01/02/1998",
      "Genre": "Homme",
      "Categorie": "Cadets",
      "Adresse": "1 avenue ",
      "Tlphn1": "0601020304",
      "Tlphn2": "0601020304",
      "Email": "Sincere@april.biz",
      "Activites": "Body-karaté",
      "NbInscritsFamille": "3"
    
    },
    
    {
      "id":5,
      "LicenceFFK": 134,
      "NomPrenom": "Leanne Graham", 
      "DateNaissance": "21/06/1993",
      "Genre": "Homme",
      "Categorie": "Cadets",
      "Adresse": "1 avenue ",
      "Tlphn1": "0601020304",
      "Tlphn2": "0601020304",
      "Email": "Sincere@april.biz",
      "Activites": "Karaté",
      "NbInscritsFamille": "0"
    
    }
    
    ]

    exportexcel(): void {
  
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Liste-complète');
 

    XLSX.writeFile(wb, this.fileName);
 
  }

  constructor() { }

  ngOnInit(): void {
  }

}
