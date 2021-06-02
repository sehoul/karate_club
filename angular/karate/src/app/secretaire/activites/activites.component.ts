import { ElementRef, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ActivitesService } from 'src/app/Services/activites.service';
import * as XLSX from 'xlsx';
import {MatSort} from '@angular/material/sort';





const USER_SCHEMA = {
  "id": "number",
  "nom": "string",
  "cotisation":"number"


};

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrls: ['./activites.component.css']
})
export class ActivitesComponent implements OnInit, AfterViewInit {

  USER_INFO: elem[] = [];
  dataSource = new MatTableDataSource<elem>(this.USER_INFO); 
 //@ts-ignore
 @ViewChild(MatPaginator) paginator: MatPaginator;
 
 ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
 }

  
   constructor(private service: ActivitesService,private cookie:CookieService){
  
   }
   //@ts-ignore
  @ViewChild(MatSort) sort: MatSort;

   ngOnInit(){
         this.service.getActivites().subscribe((response: any) =>{
           console.log(response);      
           this.USER_INFO=response;
           let groupe:string="";
           this.USER_INFO.forEach((element:any) => {
             element.Groupe.forEach((groupe_element:any) => {
                 groupe += groupe_element.NomGroupe+",  ";
             });
             element.Groupe=groupe;
             groupe="";
           });
           console.log(this.USER_INFO);
           this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
          });
      
   }
   
 
   displayedColumns: string[] = ["id",
     "nomActivite","cotisation" ,"Groupe", '$$edit'];
 
 
   title = 'angular-app';
   fileName= 'karte-club.xlsx';
   membres=this.USER_INFO;
   exportexcel(): void
   {
     let element = document.getElementById('excel-table');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
     ws['!cols'] = [];
     ws['!cols'][3] = { hidden: true };
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     XLSX.writeFile(wb, this.fileName);
  
   }
   
   dataSchema:any = USER_SCHEMA;
 
   edit(element:any){
     this.service.updateActivites(Number(this.cookie.get('idSec')),{id:Number(element.id),nomActivite:element.nomActivite,cotisation:Number(element.cotisation)}).subscribe(
       (res:any)=>{
           console.log(res.message);
       },
       error=>{
         console.log("error");
       }
     );
   }
 
   delete(element:any,index:any,id:any){
     if(confirm("Est ce que vous voulez vraiment supprimer l'activitée \" "+element+" \"")) {
       this.service.deleteActivite(Number(id),{id:Number(this.cookie.get('idSec'))}).subscribe((res:any)=>{
         if(res.success){
           this.USER_INFO.splice(Number(index), 1);
           this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
           this.dataSource.paginator = this.paginator;
         }
       },
       error=>{
          
       });
       
     }
   } 
 
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
 
 }
 
 
 export interface elem {
   id: number;
   nomActivite: string;
   cotisation: number;
   Groupe:any;
 }
 