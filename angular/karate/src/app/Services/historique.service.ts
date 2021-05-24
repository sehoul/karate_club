import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private url= 'http://localhost:8000/historique';


  constructor(private http: HttpClient) { }
  getActivites(){
    return this.http.get(this.url);    
  }
}
