import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MembresService {

  private url= 'http://localhost:8000/membres';


  constructor(private http: HttpClient) { }
  getMembres(){
    return this.http.get(this.url);
  }

  addMambre(idUser:number,data:any){
    return this.http.post(this.url+"/add/"+idUser,data);
  }

  deleteMembre(id:number,idUser:number){
    return this.http.get(this.url+"/delete/"+id+"/"+idUser);
  }
  updateMembre(idUser:number,data:any){
    return this.http.post(this.url+"/update/"+idUser,data);
  }
}
