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
  "nom": "text",
  "prenom":"text",
  "mail":"mail",
  "telephone":"text",
  "role":"text",
};

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})



export class AdminsComponent implements OnInit {
  USER_INFO:elem[]  = [];
 dataSource = new MatTableDataSource<elem>(this.USER_INFO); 
//@ts-ignore
@ViewChild(MatPaginator) paginator: MatPaginator;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}
  admins!: any[];
 
  constructor(private service: ActivitesService,private cookie:CookieService){
 
  }
  ngOnInit(){
     
          this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
          this.dataSource.paginator = this.paginator;
  }
          
  

  displayedColumns: any[] = ["id",
    "nom","prenom" ,"mail", ,"telephone", "role", '$$edit'];


  title = 'angular-app';
  fileName= 'karte-club.xlsx';
  membres=this.USER_INFO;
  exportexcel(): void
  {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    ws['!cols'] = [];
    ws['!cols'][6] = { hidden: true };
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
 
  }
  
  dataSchema:any = USER_SCHEMA;

  edit(element:any){
   

  }

  delete(element:any,index:any,id:any){
   
  }

 
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


export interface elem {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
  telephone:string;
  role:string;
}

