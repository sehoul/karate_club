import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaisonService {
  private url= 'http://localhost:8000/saison';


  constructor(private http: HttpClient) { }
  getSaison(){
    return this.http.get(this.url);
  }
  getSaisonValid(){
    return this.http.get(this.url+"/valid");
  }
  getMemberBySaison(idSaison:number){
    return this.http.get(this.url+"/"+idSaison);
  }
  deleteSaison(idSaison:number,idUser:number){
    return this.http.get(this.url+"/delete/"+idSaison+"/"+idUser);
  }
  UpdateSaison(idUser:number,data:any){
    return this.http.post(this.url+"/update/"+idUser,data);
  }
  addSaison(idUser:number,data:any){
    return this.http.post(this.url+"/add/"+idUser,data);
  }
}
