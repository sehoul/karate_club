import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { SaisonService } from 'src/app/Services/saison.service';
export interface elem {
  id: number;
  NomSaison: string;
  DateSaison: any;
  DateFinSaison:any;
}
const USER_SCHEMA = {
  "id": "number",
  "NomSaison": "string",
  "DateSaison":"date",
  "DateFinSaison":"date"
};

@Component({
  selector: 'app-saisons',
  templateUrl: './saisons.component.html',
  styleUrls: ['./saisons.component.css']
})
export class SaisonsComponent implements OnInit {
  USER_INFO: elem[] = [];
  dataSource = new MatTableDataSource<elem>(this.USER_INFO);
   constructor(private fb: FormBuilder, private cookie:CookieService, private saisonService:SaisonService){
    this.formAA=this.fb.group({
      NomSaison:  new FormControl('', [Validators.required]),
      DateSaison:new FormControl('', [Validators.required]),
      DateFinSaison:new FormControl('', [Validators.required]),
    });
   }
   ngOnInit(){
     this.saisonService.getSaison().subscribe((response: any) =>{
       this.USER_INFO=response[0];
       this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      });
      
     }
    //@ts-ignore
   @ViewChild(MatPaginator) paginator: MatPaginator;
   //@ts-ignore
   @ViewChild(MatSort) sort: MatSort;
 
   displayedColumns: string[] = ["id",
     "NomSaison","DateSaison" , "DateFinSaison",'$$edit'];
 
   _success:string="";
   _error:string="";
   formAA: FormGroup;
   dataSchema:any = USER_SCHEMA;
   edit(element:any){
     this.saisonService.UpdateSaison(Number(this.cookie.get('idSec')),{id:element.id,NomSaison:element.NomSaison,DateSaison:element.DateSaison,DateFinSaison:element.DateFinSaison}).subscribe(
       (res:any)=>{
         this._success=res.message;
         this._error="";
       },
       error=>{
         this._success="";
         this._error=error.error.message;
       }
     );
 
   }
 delete(element:any,index:any,id:any){
     if(confirm("Est ce que vous voulez vraiment supprimer la saison :  \" "+element+" \"")) {
       this.saisonService.deleteSaison(Number(id),Number(this.cookie.get('idSec'))).subscribe((res:any)=>{
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
   get NomSaison() : any {   return this.formAA.get('NomSaison');}
   get DateSaison() : any { return this.formAA.get('DateSaison');}
   get DateFinSaison() : any { return this.formAA.get('DateFinSaison');}
 
  
   submit() {
    const data={
      NomSaison:this.formAA.getRawValue().NomSaison,
      DateSaison:this.formAA.getRawValue().DateSaison,
      DateFinSaison:this.formAA.getRawValue().DateFinSaison,
    }
    if(data.NomSaison!="" && data.DateSaison!=""  && data.DateFinSaison!="" ){

      this.saisonService.addSaison(Number(this.cookie.get('idSec')),data).subscribe(
        (res:any)=>{
          this.saisonService.getSaison().subscribe((response: any) =>{
            this.USER_INFO=response[0];
            this.dataSource=new MatTableDataSource<elem>(this.USER_INFO);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
           });
          this._success="Saison a été bien ajouté!";
          this._error="";
        },
        error=>{
          this._success="";
          this._error=error.error.message;
        }
      )
    }else{
      this._success="";
      this._error="Merci de remplir tous les champs";
    }

  }
 
 
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   } 
   
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
 
 }
 
