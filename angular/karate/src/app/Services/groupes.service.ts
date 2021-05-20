import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupesService {

  private url= "http://localhost:8000/groupes";

  constructor(private http:HttpClient) { }

  getGroupes(){ 
    return this.http.get(this.url);
  }
  deleteGroupe(id:number){
    return this.http.get(this.url+"/delete/"+id); 
  }
  updateGroupe(id:number,data:any){
    return this.http.post(this.url+"/update/"+id,data);
  }


}
