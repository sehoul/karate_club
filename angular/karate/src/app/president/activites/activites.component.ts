import { ElementRef, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivitesService } from 'src/app/Services/activites.service';
import * as XLSX from 'xlsx';




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
  

  activites!: any[];
  constructor(private service: ActivitesService){}
  ngOnInit(){
        this.service.getMembres().subscribe((response: any) =>{
          console.log(response);
          
          this.USER_INFO=response });
          };
  

  displayedColumns: string[] = ["id",
    "nom","cotisation" , '$$edit'];


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
  
  nom: string;
  cotisation: number;
}

