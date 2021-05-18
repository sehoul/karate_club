import { ElementRef, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GroupesService } from 'src/app/Services/groupes.service';
import * as XLSX from 'xlsx';





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
 groupes!: any[];
  constructor(private service: GroupesService){}
  ngOnInit(){
        this.service.getGroupes().subscribe((response: any) =>{
          console.log(response);
          
          this.USER_INFO=response;
          this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
          this.dataSource.paginator = this.paginator;
         });
          };

          displayedColumns: string[] = ["id",
          "NomGroupe","activite"];
      

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
  
  dataSource = new MatTableDataSource<elem>(this.USER_INFO);;
  dataSchema:any = USER_SCHEMA;
  edit(element:any){
    console.log(element);

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