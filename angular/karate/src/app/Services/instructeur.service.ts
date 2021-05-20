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

}
