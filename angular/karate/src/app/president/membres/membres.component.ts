import { Component, OnInit } from '@angular/core';
import {Membre} from '../../membre.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {

  membres : Membre[] = [];

  Nom!: string;

  fileName= 'Classeur-karate.xlsx';



    exportexcel(): void {
  
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

   // const ws2: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
   
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Liste-complète');
    //XLSX.utils.book_append_sheet(wb, ws2, 'liste karate');

    XLSX.writeFile(wb, this.fileName);
 
  }

  constructor() { }

  ngOnInit() {
    this.membres = [
      new Membre(1,"123456789","David","prenom1",new Date("2019-01-02"),"Homme","C1","G1","Adresse 12 Rue 1","+33 6 12 12 12 12","+336 33 33 33 33","mail@mail.com",null,null,null,null,null,12.2,new Date("2019-01-02"),"bleu","shi haja"),
    new Membre(1,"123456789","Jean","prenom1",new Date("2019-01-02"),"Homme","C1","G1","Adresse 12 Rue 1","+33 6 12 12 12 12","+336 33 33 33 33","mail@mail.com",null,null,null,null,null,12.2,new Date("2019-01-02"),"bleu","shi haja")
    ];
  }



  Search(){
  if (this.Nom == ""){
    this.ngOnInit

  }else{

    this.membres = this.membres.filter(res=>{
      return res.Nom.toLocaleLowerCase().match(this.Nom.toLocaleLowerCase());
    });
  



  }
}

 

}
