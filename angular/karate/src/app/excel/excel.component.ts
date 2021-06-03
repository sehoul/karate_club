import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
interface excelData{ 
id 
licenceFFK 
nom
prenom
dateNaissance
genre
categorie
adresse
tlphn1
tlphn2
email
activites
nbInscritsFamille
 }

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {

  data!: [][];

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(evt: any){
    const target : DataTransfer = <DataTransfer>(evt.target);

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary'});

      const wsname : string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log()

      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));

      this.data[0].forEach((element:any) => {
        console.log(element);
      });
    };

    console.log(target.files.length);

    reader.readAsBinaryString(target.files[0]);

  

  }

}
