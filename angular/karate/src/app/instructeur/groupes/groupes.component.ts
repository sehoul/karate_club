import { ElementRef, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ActivitesService } from 'src/app/Services/activites.service';
import { GroupesService } from 'src/app/Services/groupes.service';
import * as XLSX from 'xlsx';


const USER_INFO: elem[] = [];



const USER_SCHEMA = {
  "id": "number",
  "nom": "string",
  "instructeur":"string"


};

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css']
})
export class GroupesComponent implements OnInit, AfterViewInit {
  USER_INFO: elem[] = [];
 dataSource = new MatTableDataSource<elem>(this.USER_INFO);
 activites:Array<any>=[];
  constructor(private service: GroupesService, private cookie:CookieService,private ActiviteService:ActivitesService){}
  ngOnInit(){
    this.service.getGroupes().subscribe((response: any) =>{
      this.USER_INFO=response;
      this.USER_INFO.forEach((element:any) => {
        element.activite=element.activite.nomActivite;
      });
      this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
      this.dataSource.paginator = this.paginator;
     });
     this.ActiviteService.getActivites().subscribe((res:any)=>{
      this.activites=res;
    });
    }

  displayedColumns: string[] = ["id",
    "NomGroupe","activite"];


  title = 'angular-app';
  fileName= 'karte-club.xlsx';
  membres=USER_INFO;
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
    this.service.updateGroupe(Number(this.cookie.get('idPres')),{id:element.id,NomGroupe:element.NomGroupe,activite:{nomActivite:element.activite}}).subscribe(
      (res:any)=>{
          console.log(res.message);
      },
      error=>{
        console.log("error");
      }
    );

  }
delete(element:any,index:any,id:any){
    if(confirm("Est ce que vous voulez vraiment supprimer le groupe \" "+element+" \"")) {
      this.service.deleteGroupe(Number(id),{id:Number(this.cookie.get('idPres'))}).subscribe((res:any)=>{
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
  NomGroupe: string;
  activite: any;
}

