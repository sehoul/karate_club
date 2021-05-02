import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PresidentService {

  private url= "";

  constructor(private http:HttpClient) { }

  getCategories(){ 
    return this.http.get('http://localhost:8000/categories');
  }
}
