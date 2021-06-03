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
import { AdministrationService } from 'src/app/Services/administration.service';
import {MatSort} from '@angular/material/sort';

const USER_SCHEMA = {
  "id": "number",
  "Nom": "string",
  "Prenom": "string",
  "email": "string",
  "Tel": "string",
  "roles": "string"
};

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})



export class AdminsComponent implements OnInit {
 
USER_INFO: elem[] = [];
hide = true;
 dataSource = new MatTableDataSource<elem>(this.USER_INFO);
  
  constructor(private cookie:CookieService, private AdminService:AdministrationService){}
  ngOnInit(){

    this.AdminService.getAdmins().subscribe((res:any)=>{
      this.USER_INFO=res;
      this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
      
      }
  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns: string[] = ["id",
    "Nom",'Prenom','email','Tel','roles' ,'Nouveau Mot de passe', '$$edit'];
  _success:string="";
  _error:string="";
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
    console.log(element);
  }
delete(element:any,index:any,id:any){
      if(confirm("Est ce que vous voulez vraiment supprimer l'utilisateur \" "+element+" \"")) {
        this.AdminService.deleteAdmin(Number(this.cookie.get('idPres')),Number(id)).subscribe((res:any)=>{
          if(res.success){
            this.USER_INFO.splice(Number(index), 1);
            this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
            this.dataSource.paginator = this.paginator;
            this._success="";
            this._error="";
          }
        },
        error=>{
          this._success="";
          this._error=error.error.message;
        });
        
      }
  }
  hashPassword(password: string){
    return "*".repeat(password.length)
  }

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
  id: number;
  Nom: string;
  Prenom: string;
  email: string;
  Tel: string;
  roles: string;
}