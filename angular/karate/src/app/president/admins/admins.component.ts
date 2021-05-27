import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivitesService } from 'src/app/Services/activites.service';
import { GroupesService } from 'src/app/Services/groupes.service';
import { InstructeurService } from 'src/app/Services/instructeur.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';


const USER_SCHEMA = {
  "id": "number",
  "Nom": "string",
  "Prenom": "string",
  "Email": "string",
  "Telephone": "string",
  "Role": "string",
  "Password": "password",
};

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})



export class AdminsComponent implements OnInit {
 
USER_INFO: elem[] = [
  {
    id: 1,
  Nom: "string",
  Prenom:"prenom",
  Email: "string",
  Telephone: "string",
  Role: "string",
  Password: "string",
  }
];
hide = true;
 dataSource = new MatTableDataSource<elem>(this.USER_INFO);
  
  constructor(private service: GroupesService, private cookie:CookieService){}
  ngOnInit(){
      this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
      this.dataSource.paginator = this.paginator;
      }

  displayedColumns: string[] = ["id",
    "Nom",'Prenom','Email','Role','Password' , '$$edit'];

  title = 'angular-app';
  fileName= 'karte-club.xlsx';
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
  edit(element:any){
    
  }
delete(element:any,index:any,id:any){

  }
  hashPassword(password: string){
    return "*".repeat(password.length)
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
  Nom: string;
  Prenom: string;
  Email: string;
  Telephone: string;
  Role: string;
  Password: string;
}