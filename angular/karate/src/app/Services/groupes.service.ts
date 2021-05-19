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
}
