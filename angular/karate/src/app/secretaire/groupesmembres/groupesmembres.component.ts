import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ActivitesService } from 'src/app/Services/activites.service';
import { GroupesService } from 'src/app/Services/groupes.service';
import * as XLSX from 'xlsx';
import { ElementRef } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';






const USER_SCHEMA = {
  "id": "number",
  "nom": "string",
  "instructeur":"string"
};

@Component({
  selector: 'app-groupesmembres',
  templateUrl: './groupesmembres.component.html',
  styleUrls: ['./groupesmembres.component.css']
})
export class GroupesmembresComponent implements OnInit, AfterViewInit {

 USER_INFO: elem[] = [];
 dataSource = new MatTableDataSource<elem>(this.USER_INFO);
 activites:Array<any>=[];
 MembresGroupes:Array<any>=[];
  constructor(private service:GroupesService, private cookie:CookieService ,private ActiviteService:ActivitesService){}
  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(){
    this.service.getGroupesMembres().subscribe((response: any) =>{
      response.forEach((element:any) => {
          if(element.MembresGroupe.length)
          {
              element.MembresGroupe.forEach((membres:any) => {
               this.USER_INFO.push({
              Groupe:element.NomGroupe,
              activite:element.activite.nomActivite,
              LicenceFFK:membres.Membre.numLicenceFFK,
              nom:membres.Membre.nom,
              prenom:membres.Membre.prenom,
              grade:membres.Membre.grade,
              Categorie:membres.Membre.categorie.nomCategorie,
               });
            });
          }else{
            this.USER_INFO.push({
              Groupe:element.NomGroupe,
              activite:element.activite.nomActivite,
              LicenceFFK:"liste vide ...",
              nom:"liste vide ...",
              prenom:"liste vide ...",
              grade:"liste vide ...",
              Categorie:"liste vide ...",
               });
          }
      });
      this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     });

     this.ActiviteService.getActivites().subscribe((res:any)=>{
      this.activites=res;
    });
    
   
    }

  displayedColumns: string[] = ["activite",
    "Groupe", "LicenceFFK","nom", "prenom" ,"grade","Categorie"];


  title = 'angular-app';
  fileName= 'karte-club.xlsx';
  membres=this.USER_INFO;
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    ws['!cols'] = [];
    ws['!cols'][3] = { hidden: true };
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
  
  dataSchema:any = USER_SCHEMA;
 





  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  



}

export interface elem {
  Groupe: string;
  activite: string;
  LicenceFFK: string;
  nom: string;
  prenom: string;
  grade: string;
  Categorie: string;
}