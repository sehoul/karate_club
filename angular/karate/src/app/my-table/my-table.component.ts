import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MyTableDataSource, MyTableItem } from './my-table-datasource';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<MyTableItem>;
  dataSource: MyTableDataSource;

  items : MyTableItem[] = [];

  nom: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','licenceFFK','nom','prenom','dateNaissance','genre','categorie','adresse','tlphn1','tlphn2','email','activites','nbInscritsFamille'];

  constructor() {
    this.dataSource = new MyTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(){
  }

  Search(){
    if (this.nom == ""){
      this.items
  
    }else{
  
      this.items = this.items.filter(res=>{
        return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      });
    
}
}
}

