import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmploidutempsService {
  private url= 'http://localhost:8000/emploisDuTemps';


  constructor(private http: HttpClient) { }

  getCrenau(){
    return this.http.get(this.url);
  }

  addCrenau(id:number,data:any){
    return this.http.post(this.url+"/add/"+id,data);
  }
}