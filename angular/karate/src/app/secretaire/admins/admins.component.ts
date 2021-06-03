import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { AdministrationService } from 'src/app/Services/administration.service';
import * as XLSX from 'xlsx';
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
    "Nom",'Prenom','email','Tel','roles' ,'NouveauMotDePasse', '$$edit'];
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
    this.AdminService.updateAdmin(Number(this.cookie.get('idSec')),{id: element.id ,Tel: element.Tel, email: element.email, role: element.roles, Nom: element.Nom, Prenom: element.Prenom,Password:element.NouveauMotDePasse}).subscribe(
      (res:any)=>{
        this._success=res.message;
        this._error="";
    },
    error=>{
      this._success="";
      this._error=error.error.message;
    }
    )
    console.log(element);
  }
delete(element:any,index:any,id:any){
      if(confirm("Est ce que vous voulez vraiment supprimer l'utilisateur \" "+element+" \"")) {
        this.AdminService.deleteAdmin(Number(this.cookie.get('idSec')),Number(id)).subscribe((res:any)=>{
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
    if((""+password)=== "undefined")
        return password;
    else
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