import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url= "http://localhost:8000/categories";

  constructor(private http:HttpClient) { }

  getCategories(){ 
    return this.http.get('http://localhost:8000/categories');
  }
}
