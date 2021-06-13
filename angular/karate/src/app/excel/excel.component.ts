import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ActivitesService } from '../Services/activites.service';
import { MembresService } from '../Services/membres.service';
interface excelData{ 
  NumLicenceFFK: string;
  Nom: string | null;
  Prenom: string | null;
  DateNaissance: Date | null;
  Genre: string | null;
  categorie: any | null;
  Groupe: any | null;
  Adresse: string | null;
  Telephone1: string | null;
  Telephone2: string | null;
  Email: string | null;
  Cotisation: number | null;
  NomParents: string | null;
  PrenomParents: string | null;
  TelephoneParents1: string | null;
  TelephoneParents2: string | null;
  EmailParents: string | null;
  DateInscription: string | null;
  Grade: string | null;
  Observation: string | null;
  membreActivites: any | null;
 }

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {
  excel:Array<excelData>=[]
  data!: [][];
  Actiitees:Array<any> = [];

  constructor(private membreService:MembresService, private activiteService:ActivitesService) { }

  ngOnInit(): void {

    this.activiteService.getActivites().subscribe((d:any)=>{
      this.Actiitees=d;
    },
    error=>{
      console.log(error.error.message);
    }
    );
  }

  onFileChange(evt: any, idSport:number){
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
        if(i>1 && element.length){
          this.excel.push({
            NumLicenceFFK: element[0],
            Nom: (element[1].split(" ", 2))[0],
            Prenom: (element[1].split(" ", 2))[1],
            DateNaissance:element[2],
            Genre: element[3],
            categorie: {nomCategorie:element[4]},
            Groupe: {nomGroupe:element[5]},
            Adresse: element[6],
            Telephone1: element[7],
            Telephone2: element[8],
            Email: element[9],
            NomParents: (element[10].split(" ", 2))[0],
            PrenomParents: (element[10].split(" ", 2))[1],
            TelephoneParents1: element[11],
            TelephoneParents2: element[12],
            EmailParents: element[13],
            Cotisation: element[14],
            DateInscription: element[15],
            Grade: element[16],
            Observation: element[17],
            membreActivites: [{activite:{id:idSport}}],
          });
        }
        i++;
      });

      console.log(this.excel);
    };

    console.log(target.files.length);

    reader.readAsBinaryString(target.files[0]);

  

  }

}
