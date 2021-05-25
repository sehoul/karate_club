import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activite } from '../activite.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitesService {

  private url= 'http://localhost:8000/activites';


  constructor(private http: HttpClient) { }
  getActivites(){
    return this.http.get(this.url);    
  }

  addActivite(id:number,data:any){
    return this.http.post(this.url+"/add/"+id,data);
  }

  updateActivites(id:number,data:any){
    return this.http.post(this.url+"/update/"+id,data);
  }

  deleteActivite(id:number,idUser:any){
    return this.http.post(this.url+"/delete/"+id,idUser); 
  }
}
