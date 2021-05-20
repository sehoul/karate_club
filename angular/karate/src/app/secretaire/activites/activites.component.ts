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
  dataSource = new MatTableDataSource<elem>(this.USER_INFO);;
  dataSchema:any = USER_SCHEMA;
  activites!: any[];
  displayedColumns: string[] = ["id","nomActivite","cotisation" , '$$edit'];
  title = 'angular-app';
  fileName= 'karte-club.xlsx';

  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ActivitesService){}

  
  ngOnInit(){
      this.service.getActivites().subscribe((response: any) =>{
          this.USER_INFO=response;
          this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
          this.dataSource.paginator = this.paginator;
      });
  };
          
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  exportexcel(): void
  {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    ws['!cols'] = [];
    ws['!cols'][3] = { hidden: true };

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  

  edit(element:any){
    
    this.service.updateActivites(Number(element.id),{nomActivite:element.nomActivite,cotisation:element.cotisation}).subscribe(
      (res:any)=>{
          console.log(res.message);
      },
      error=>{
        console.log("error");
      }
    );

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

