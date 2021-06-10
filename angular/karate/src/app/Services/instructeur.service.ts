import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructeurService {
  private url= "http://localhost:8000/instructeur";

  constructor(private http:HttpClient) { }

  getInstructeursMiniInfo(){ 
    return this.http.get(this.url+"/mini-info");
  }

  getProfile(id:number){
    return this.http.get(this.url+"/"+id);
  }

  updateProfile(id:number,data:any){
    return this.http.post(this.url+"/update/"+id,data);
  }

}
