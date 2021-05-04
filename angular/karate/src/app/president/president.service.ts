import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PresidentService {

<<<<<<< HEAD
  private url= "";
=======
  private url= "http://localhost:8000/categories";
>>>>>>> 61d52dd4a84886267c2f13e5d3225ae33a1103d6

  constructor(private http:HttpClient) { }

  getCategories(){ 
    return this.http.get('http://localhost:8000/categories');
  }
}
